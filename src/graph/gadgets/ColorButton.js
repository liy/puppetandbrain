import './ColorButton.scss';
import Gadget from './Gadget';

export default class extends Gadget
{
  constructor() {
    super();
    this.element.className = 'color-button';

    let svg = new DOMParser().parseFromString(require('!raw-loader!../../assets/bar.svg'), "image/svg+xml").rootElement;
    svg.setAttribute('height', 24)
    this.element.appendChild(svg);

    this.line = this.element.querySelector('#line');

    this.hexField = document.createElement('span');
    this.hexField.className = 'color-hex';
    this.element.appendChild(this.hexField);

    this.onDown = this.onDown.bind(this);
    this.element.addEventListener('mousedown', this.onDown);

    this.color = 0xFF9900;
  }

  onDown(e) {
  }

  set color(hex) {
    if(hex == 0xFFFFFF) {
      this.hexField.style.color = '#000';
    }
    else {
      this.hexField.style.color = '#FFF';
    }
    hex = `#${hex.toString(16)}`.toUpperCase();
    this.hexField.textContent = hex;
    this.line.setAttribute('stroke', hex);
  }
}