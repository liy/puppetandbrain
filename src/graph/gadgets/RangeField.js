import './RangeField.scss';
import Gadget from './Gadget';

const padding = 15;

// TODO: rename to range
export default class extends Gadget
{
  constructor({value=0, min=0, max=1, decimalPlaces=2}) {
    super();

    this.min = min;
    this.max = max;

    this.element.classList.add('range-field');

    this.barSvg = new DOMParser().parseFromString(require('!raw-loader!../../assets/bar.svg'), "image/svg+xml").rootElement;
    this.width = 91;
    this.height = 26;
    this.barSvg.setAttribute('width', this.width)
    this.barSvg.setAttribute('height', this.height)
    this.element.appendChild(this.barSvg);

    this.line = this.element.querySelector('#line');

    this.rangeInput = document.createElement('input');
    this.rangeInput.type = 'number';
    this.element.appendChild(this.rangeInput);
    this.rangeInput.addEventListener('input', this.onInput.bind(this));
    // use click to focus the text
    this.rangeInput.addEventListener('mousedown', e => {
      e.preventDefault();
      this.rangeInput.blur();
    })
    this.rangeInput.addEventListener('click', e => {
      this.rangeInput.focus();
    })

    this.lastX = 0;

    this.onDown = this.onDown.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
    
    this.element.addEventListener('mousedown', this.onDown)
    this.element.addEventListener('touchstart', this.onDown)

    this.decimalPlaces = decimalPlaces;

    this.value = value;
    this.updateInput();
    this.updateLine();
  }

  destroy() {
    super.destroy();
    this.element.removeEventListener('mousedown', this.onDown)
    this.element.removeEventListener('touchstart', this.onDown)
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
  }
  
  onInput(e) {
    this._value = e.target.value;
    this.emit('gadget.state.change', this.value);
    this.updateLine();
  }

  onDown(e) {
    e.stopImmediatePropagation();
    
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('touchmove', this.onDrag);
    
    document.addEventListener('mouseup', this.onStop);
    document.addEventListener('touchend', this.onStop);

    let offsetX = e.changedTouches ? e.changedTouches[0].clientX-this.element.getBoundingClientRect().left : e.offsetX;

    // make a little padding because the bar has rounded corner
    offsetX = offsetX*(this.width+padding*2)/this.width - padding;

    let ratio = offsetX/this.width;
    this.value = this.min + (this.max-this.min)*ratio;
    
    this.emit('gadget.state.change', this.value);

    this.lastX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

    this.updateLine();
    this.updateInput();
  }

  onDrag(e) {
    e.stopImmediatePropagation();
    
    let x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    // TODO: a better mapping, maybe not linear but power line.
    let inc = (this.max-this.min)/100;
    let sign = Math.sign(x - this.lastX);
    this.value += inc*sign;
    this.lastX = x;

    this.emit('gadget.state.change', this.value);

    this.updateLine();
    this.updateInput();
  }

  set value(n) {
    n = Math.min(this.max, n);
    n = Math.max(this.min, n);

    this._value = n;
  }

  get value() {
    return this._value;
  }

  onStop(e) {
    e.stopImmediatePropagation();

    document.removeEventListener('mouseup', this.onStop);
    document.removeEventListener('touchend', this.onStop);

    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
  }

  updateLine() {
    let ratio = Math.min(1, (this.value-this.min)/(this.max-this.min));
    ratio = Math.max(0, ratio);
    if(ratio == 0) {
      this.line.setAttribute('d', '');
    }
    else {
      this.line.setAttribute('d', `M10 10h${50*ratio}`);
    }
  }

  updateInput() {
    this.rangeInput.value = Number(this.value).toFixed(this.decimalPlaces);
  }
}