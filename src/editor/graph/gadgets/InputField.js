import './InputField.scss';
import Gadget from './Gadget';

export default class extends Gadget
{
  constructor(value, type='text', placeholder='...') {
    super();
    this.element.classList.add('input-field');

    this.input = document.createElement('input');
    this.input.type = type;
    this.element.appendChild(this.input);

    this.value = value;
    this.placeholder = placeholder;

    this.onInput = this.onInput.bind(this);
    this.input.addEventListener('input', this.onInput);

    this.input.addEventListener('keydown', e => {
      if (e.ctrlKey && (e.key === 'z' || e.key === 'y')) {
        e.stopImmediatePropagation();
      }
    })
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
    this.input.value = v;
  }

  get value() {
    return this.input.value;
  }

  focus() {
    this.input.focus();
  }
}