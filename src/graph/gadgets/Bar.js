import './Bar.scss';
import Gadget from './Gadget';

export default class Bar extends Gadget
{
  constructor() {
    super();
    this.element.className = 'bar-container';
    this.element.style.display = 'none';

    this.barSvg = new DOMParser().parseFromString(require('!raw-loader!../../assets/bar.svg'), "image/svg+xml").rootElement;
    this.barSvg.setAttribute('class', 'bar-svg');
    this.barSvg.setAttribute('width', 70);
    this.barSvg.setAttribute('height', 20);
    this.element.appendChild(this.barSvg);

    this.line = this.element.querySelector('#line');

    this.input = document.createElement('input');
    this.element.appendChild(this.input);

    this.min = 0;
    this.max = 1;

    this.decimalPlaces = 2;

    this.onDrag = this.onDrag.bind(this);
  }

  init(node, name) {
    super.init(node, name)
    
    this.input.addEventListener('mousedown', e => {
      e.preventDefault();
    })

    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
      document.addEventListener('mousemove', this.onDrag);
    })

    this.element.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', this.onDrag);
    })
  }

  onDrag(e) {
    console.log(e)
  }

  onStop() {
    
  }

  get ratio() {
    (this.max-this.min)
  }

  set ratio(v) {
    this._ratio = Math.min(v, 1);
    this.line.setAttribute('d', `M10 10h${50*this._ratio}`);
    this.input.value = this.number.toFixed(this.decimalPlaces);
  }

  get value() {
    return this.node.variables[this.name];
  }
}