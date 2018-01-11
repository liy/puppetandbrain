import './InputField.scss';

export default class InputField
{
  constructor(v, p='...') {
    this.element = document.createElement('div');
    this.element.className = 'input-field';

    this.input = document.createElement('input');
    this.element.appendChild(this.input);

    this.value = v;
    this.placeholder = p;
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