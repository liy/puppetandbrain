import './Toggle.scss'
import Gadget from './Gadget';

export default class Toggle extends Gadget
{
  constructor(value=false) {
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

    this.value = value;
  }

  destroy() {
    super.destroy();
    this.element.removeEventListener('mousedown', this.mouseDown);
  }

  mouseDown(e) {
    e.stopPropagation();

    this.value = !this.value;
    this.emit('gadget.state.change', this.value);
  }

  set value(v) {
    if(v) {
      this.knob.setAttribute('transform', `translate(${10})`)
      this.color.setAttribute('fill', '#006AFF')
    }
    else {
      this.knob.setAttribute('transform', `translate(${0})`)
      this.color.setAttribute('fill', '#808080')
    }
    this._value = v;
  }

  get value() {
    return this._value;
  }
}