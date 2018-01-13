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
    this.element.appendChild(this.barSvg);

    this.line = this.element.querySelector('#line');

    this.rangeSpan = document.createElement('span');
    this.rangeSpan.className = 'range-span';
    this.element.appendChild(this.rangeSpan);

    this.min = 0;
    this.max = 1;

    this.decimalPlaces = 2;

    this.lastX = 0;

    this.onDown = this.onDown.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  init(node, name) {
    super.init(node, name)

    this.element.addEventListener('mousedown', this.onDown)
    this.element.addEventListener('touchstart', this.onDown)

    document.addEventListener('mouseup', this.onStop)
    document.addEventListener('touchend', this.onStop)

    this.update();
  }

  destroy() {
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
    this.number = offsetX/80 * (this.min + (this.max-this.min));

    this.lastX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
  }

  onDrag(e) {
    let x = e.clientX ? e.clientX : e.changedTouches[0].clientX;
    let inc = (this.max-this.min)/100;
    let sign = Math.sign(x - this.lastX);
    this.number += inc*sign;
    this.lastX = x;
  }

  set number(n) {
    n = Math.min(this.max, n);
    n = Math.max(this.min, n);
    this.node.memory[this.name] = n;
    this.update();
  }

  get number() {
    return this.node.memory[this.name];
  }

  onStop() {
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
  }

  update() {
    let ratio = Math.min(1, (this.number-this.min)/(this.max-this.min));
    if(ratio == 0) {
      this.line.setAttribute('d', '');
    }
    else {
      this.line.setAttribute('d', `M10 10h${50*ratio}`);
    }
    this.rangeSpan.textContent = this.number.toFixed(this.decimalPlaces);
  }
}