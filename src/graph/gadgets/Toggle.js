import './Toggle.scss'
import Gadget from './Gadget';

export default class Toggle extends Gadget
{
  constructor() {
    super();
    this.element.className = 'toggle-container';
    this.element.style.display = 'none';

    this.toggle = new DOMParser().parseFromString(require('../../assets/toggle.svg'), "image/svg+xml").rootElement;
    this.toggle.setAttribute('class', 'toggle-svg');
    this.toggle.setAttribute('width', 30);
    this.toggle.setAttribute('height', 20);
    this.element.appendChild(this.toggle);

    this.knob = this.element.querySelector('#knob');
    this.color = this.element.querySelector('#color');

    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
      this.on = !this.on;
    })

    this.on = false
  }

  set on(v) {
    this._on = v;
    if(this._on) {
      this.knob.setAttribute('transform', `translate(${10})`)
      this.color.setAttribute('fill', '#a4b500')
    }
    else {
      this.knob.setAttribute('transform', `translate(${0})`)
      this.color.setAttribute('fill', '#999999')
    }
  }

  get on() {
    return this._on
  }
}