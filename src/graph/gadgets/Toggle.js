import './Toggle.scss'
import Gadget from './Gadget';

export default class Toggle extends Gadget
{
  constructor(value=false) {
    super();
    this.element.classList.add('toggle-button');

    this.toggle = new DOMParser().parseFromString(require('!raw-loader!../../assets/toggle2.svg'), "image/svg+xml").rootElement;
    this.toggle.setAttribute('class', 'toggle-svg');
    this.toggle.setAttribute('width', 35);
    this.toggle.setAttribute('height', 20);
    this.element.appendChild(this.toggle);

    this.knob = this.element.querySelector('#knob');
    this.slot = this.element.querySelector('#slot');

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
      this.knob.setAttribute('transform', `translate(${15})`)
      this.knob.setAttribute('fill', '#FFF')
      this.slot.setAttribute('fill', '#BD80FF')
    }
    else {
      this.knob.setAttribute('transform', `translate(${0})`)
      this.knob.setAttribute('fill', '#CCC')
      this.slot.setAttribute('fill', '#a0a0a0')
    }
    this._value = v;
  }

  get value() {
    return this._value;
  }
}