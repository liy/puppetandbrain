import './Toggle.scss'
import Gadget from './Gadget';

export default class Toggle extends Gadget
{
  constructor() {
    super();
    this.element.className = 'toggle-container';

    this.toggle = new DOMParser().parseFromString(require('!raw-loader!../../assets/toggle.svg'), "image/svg+xml").rootElement;
    this.toggle.setAttribute('class', 'toggle-svg');
    this.toggle.setAttribute('width', 30);
    this.toggle.setAttribute('height', 20);
    this.element.appendChild(this.toggle);

    this.knob = this.element.querySelector('#knob');
    this.color = this.element.querySelector('#color');

    this.mouseDown = this.mouseDown.bind(this);
    this.element.addEventListener('mousedown', this.mouseDown);

  }

  init(node, name) {
    super.init(node, name);
    this.on = this.node.variables[name];
  }

  destroyed() {
    this.element.removeEventListener('mousedown', this.mouseDown);
  }

  mouseDown(e) {
    e.stopPropagation();
    this.on = !this.on;
  }

  set on(v) {
    if(v) {
      this.knob.setAttribute('transform', `translate(${10})`)
      this.color.setAttribute('fill', '#a4b500')
    }
    else {
      this.knob.setAttribute('transform', `translate(${0})`)
      this.color.setAttribute('fill', '#999999')
    }

    this.node.variables[this.name] = v;
  }

  get on() {
    return this.node.variables[this.name];
  }
}