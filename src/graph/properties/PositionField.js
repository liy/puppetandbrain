import './PositionField.scss';
import InputField from "./InputField";

export default class
{
  constructor(x, y) {
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
  }

  get xInput() {
    return this.xInputField.input;
  }

  get yInput() {
    return this.yInputField.input;
  }
}