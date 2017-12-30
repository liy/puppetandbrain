import './Bar.scss';
import Gadget from './Gadget';

export default class Bar extends Gadget
{
  constructor() {
    super();
    this.element.className = 'bar-container';

    this.barSvg = new DOMParser().parseFromString(require('../../assets/bar.svg'), "image/svg+xml").rootElement;
    this.barSvg.setAttribute('class', 'bar-svg');
    this.barSvg.setAttribute('width', 90);
    this.barSvg.setAttribute('height', 20);
    this.element.appendChild(this.barSvg);

    this.line = this.element.querySelector('#line');

    this.input = document.createElement('input');
    this.element.appendChild(this.input);

    this.min = 0;
    this.max = 1;

    this.decimalPlaces = 2;

    this.ratio = 0;

    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
    })
  }

  get ratio() {
    return this._ratio;
  }

  set ratio(v) {
    this._ratio = Math.min(v, 1);
    this.line.setAttribute('d', `M10 10h${70*this._ratio}`);
    this.input.value = this.number.toFixed(this.decimalPlaces);
  }

  get number() {
    return this.min + (this.max - this.min)*this._ratio;
  }
}