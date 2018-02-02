import './PositionField.scss';
import InputField from "./InputField";
import Gadget from './Gadget';

export default class extends Gadget
{
  constructor(vec2={x:1,y:1}) {
    super();
    this.element.classList.add('vec2-field');

    this.xSpan = document.createElement('span');
    this.xSpan.className = 'x-span';
    this.xSpan.textContent = 'x'
    this.element.appendChild(this.xSpan);

    this.xInputField = new InputField(vec2.x)
    this.xInputField.input.type = 'number'
    this.xInputField.input.step = 0.01
    this.element.appendChild(this.xInputField.element);

    this.ySpan = document.createElement('span');
    this.ySpan.className = 'y-span';
    this.ySpan.textContent = 'y'
    this.element.appendChild(this.ySpan);

    this.yInputField = new InputField(vec2.y);
    this.yInputField.input.type = 'number'
    this.yInputField.input.step = 0.01
    this.element.appendChild(this.yInputField.element);
    this._scale = vec2; 

    this.xInputField.on('gadget.state.change', x => {
      this._scale.x = Number(x);
      this.value = this._scale;
      this.emit('gadget.state.change', this._scale)
    })

    this.yInputField.on('gadget.state.change', y => {
      this._scale.y = Number(y);
      this.value = this._scale
      this.emit('gadget.state.change', this._scale)
    })

    this.xInputField.input.addEventListener('click', e => {
      e.target.select();
    })
    this.yInputField.input.addEventListener('click', e => {
      e.target.select();
    })
  }

  destroy() {
    this.xInputField.destroy();
    this.yInputField.destroy();
    super.destroy();
  }

  get value() {
    return this._scale
  }

  set value(vec2) {
    this._scale = {
      x: vec2.x,
      y: vec2.y
    }
    this.xInputField.value = vec2.x;
    this.yInputField.value = vec2.y;
  }
}