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

  set value(v) {
    this.input.value = v;
  }

  get value() {
    return this.input.value;
  }

  focus() {
    this.input.focus();
  }
}