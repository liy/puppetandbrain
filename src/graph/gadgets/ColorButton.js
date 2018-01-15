import './ColorButton.scss';
import Gadget from './Gadget';

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

    this.hexField = document.createElement('div');
    this.hexField.className = 'color-hex';
    this.element.appendChild(this.hexField);

    this.onDown = this.onDown.bind(this);
    this.element.addEventListener('mousedown', this.onDown);

    this.value = color;
  }

  destroy() {
    super.destroy();
    this.element.removeEventListener('mousedown', this.onDown);
  }

  onDown(e) {
    this.value = Math.ceil(Math.random() * 0xFFFFFF);
    this.emit('gadget.state.change', this.value);
  }

  set value(c) {
    if(c == 0) {
      this.hexField.style.color = '#FFF';
    }
    else {
      this.hexField.style.color = '#000';
    }
    let hex = `#${c.toString(16)}`.toUpperCase();
    this.hexField.textContent = hex;
    this.line.setAttribute('stroke', hex);
    this._color = c;
  }

  get value() {
    return this._color;
  }
}