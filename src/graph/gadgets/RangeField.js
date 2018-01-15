import './RangeField.scss';
import Gadget from './Gadget';

// TODO: rename to range
export default class extends Gadget
{
  constructor({value=0, min=0, max=1, decimalPlaces=2}) {
    super();
    this.element.className = 'range-field';

    this.barSvg = new DOMParser().parseFromString(require('!raw-loader!../../assets/bar.svg'), "image/svg+xml").rootElement;
    this.barSvg.setAttribute('class', 'range-field-svg');
    this.element.appendChild(this.barSvg);

    this.line = this.element.querySelector('#line');

    this.rangeSpan = document.createElement('span');
    this.rangeSpan.className = 'range-field-span';
    this.element.appendChild(this.rangeSpan);

    this.min = min;
    this.max = max;

    this.decimalPlaces = decimalPlaces;

    this.lastX = 0;

    this.onDown = this.onDown.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
    
    this.element.addEventListener('mousedown', this.onDown)
    this.element.addEventListener('touchstart', this.onDown)

    document.addEventListener('mouseup', this.onStop);
    document.addEventListener('touchend', this.onStop);
  }

  destroy() {
    super.destroy();
    this.element.removeEventListener('mousedown', this.onDown)
    this.element.removeEventListener('touchstart', this.onDown)
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
  }

  onDown(e) {
    e.stopPropagation();
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('touchmove', this.onDrag);

    let offsetX = e.offsetX ? e.offsetX : e.changedTouches[0].clientX-this.element.getBoundingClientRect().left
    this.value = offsetX/80 * (this.min + (this.max-this.min));

    this.lastX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
  }

  onDrag(e) {
    let x = e.clientX ? e.clientX : e.changedTouches[0].clientX;
    let inc = (this.max-this.min)/100;
    let sign = Math.sign(x - this.lastX);
    this.value += inc*sign;
    this.lastX = x;

    this.emit('gadget.state.change', this.value);
  }

  set value(n) {
    n = Math.min(this.max, n);
    n = Math.max(this.min, n);

    this._value = n;

    this.update();
  }

  get value() {
    return this._value;
  }

  onStop() {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
  }

  update() {
    let ratio = Math.min(1, (this.value-this.min)/(this.max-this.min));
    if(ratio == 0) {
      this.line.setAttribute('d', '');
    }
    else {
      this.line.setAttribute('d', `M10 10h${50*ratio}`);
    }
    this.rangeSpan.textContent = this.value.toFixed(this.decimalPlaces);
  }
}