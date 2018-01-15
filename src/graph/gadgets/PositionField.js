import './PositionField.scss';
import InputField from "./InputField";
import Gadget from './Gadget';

export default class extends Gadget
{
  constructor(x, y) {
    super();
    this.element = document.createElement('div');
    this.element.className = 'position-field'

    this.xSpan = document.createElement('span');
    this.xSpan.className = 'x-span';
    this.xSpan.textContent = 'x'
    this.element.appendChild(this.xSpan);

    this.xInputField = new InputField(x)
    this.xInputField.input.type = 'number'
    this.element.appendChild(this.xInputField.element);

    this.ySpan = document.createElement('span');
    this.ySpan.className = 'y-span';
    this.ySpan.textContent = 'y'
    this.element.appendChild(this.ySpan);

    this.yInputField = new InputField(y);
    this.yInputField.input.type = 'number'
    this.element.appendChild(this.yInputField.element);

    this._position = {x,y} 

    this.xInputField.on('gadget.state.change', x => {
      this._position.x = Number(x);
      this.value = this._position;
      this.emit('gadget.state.change', this._position)
    })

    this.yInputField.on('gadget.state.change', y => {
      this._position.y = Number(y);
      this.value = this._position
      this.emit('gadget.state.change', this._position)
    })

    this.xInputField.input.addEventListener('click', e => {
      e.target.select();
    })
    this.yInputField.input.addEventListener('click', e => {
      e.target.select();
    })
  }

  destroy() {
    super.destroy();
    this.xInputField.destroy();
    this.yInputField.destroy();
  }

  get value() {
    return this._position
  }

  set value(position) {
    this._position = {
      x: position.x,
      y: position.y
    }
    this.xInputField.value = position.x;
    this.yInputField.value = position.y;
  }
}