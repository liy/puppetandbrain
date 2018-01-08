import './InputField.scss';

export default class InputField
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'input-field';

    this.input = document.createElement('input');
    this.element.appendChild(this.input);
  }

  set placeholder(p) {
    this.input.setAttribute('placeholder', p);
  }
}