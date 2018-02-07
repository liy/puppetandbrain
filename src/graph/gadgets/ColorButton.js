import './ColorButton.scss';
import Gadget from './Gadget';

// TODO: use custom color input... system's almost un-usable...
export default class extends Gadget
{
  constructor(color=0xFF9900) {
    super();
    this.element.classList.add('color-button');

    // TODO: create a specific svg for the color button
    let svg = new DOMParser().parseFromString(require('!raw-loader!../../assets/bar.svg'), "image/svg+xml").rootElement;
    svg.setAttribute('height', 26)
    this.element.appendChild(svg);

    this.line = this.element.querySelector('#line');


    this.colorInput = document.createElement('input');
    this.colorInput.className = 'color-hex';
    this.colorInput.type = 'color'
    console.log(this.colorInput)
    this.element.appendChild(this.colorInput);
    this.colorInput.addEventListener('change', this.onChange.bind(this));

    this.value = color;
  }

  onChange(e) {
    this._color = Number(e.target.value.replace('#', '0x'))
    this.line.setAttribute('stroke', e.target.value);
    this.emit('gadget.state.change', this.value);
  }

  set value(c) {
    this._color = c;

    if(Number.isInteger(c)) {
      c = `#${c.toString(16)}`;
    }
    this.line.setAttribute('stroke', c);
  }

  get value() {
    return this._color;
  }
}