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

    this.onInput = this.onInput.bind(this);
    this.input.addEventListener('input', this.onInput);
  }

  destroy() {
    super.destroy();
    this.input.removeEventListener('input', this.onInput);
  }

  set placeholder(p) {
    this.input.setAttribute('placeholder', p);
  }

  onInput(e) {
    this.emit('gadget.state.change', e.target.value)
  }

  set value(v) {
    this._value = v;
  }

  get value() {
    return this.input.value;
  }

  focus() {
    this.input.focus();
  }
}