import './TextField.scss'
import Gadget from "./Gadget";

// use span with contentditable=true, it allows auto expand
// https://stackoverflow.com/questions/7168727/make-html-text-input-field-grow-as-i-type
export default class extends Gadget
{
  constructor(value, placeholder='...') {
    super()
    this.element.classList.add('text-field');

    this.input = document.createElement('span');
    this.input.className = 'data-text'
    this.input.contentEditable = true;
    this.value = value;
    this.placeholder = placeholder;
    this.element.appendChild(this.input);

    this.onInput = this.onInput.bind(this);
    this.input.addEventListener('input', this.onInput);

    this.input.addEventListener('mousedown', e => {
      e.stopPropagation();
    });
  }

  destroy() {
    super.destroy();
    this.input.removeEventListener('input', this.onInput);
  }

  set placeholder(p) {
    this.input.setAttribute('placeholder', p);
  }
  
  onInput(e) {
    // this removes any br, div...
    this.input.textContent = this.input.textContent;
    this.emit('gadget.state.change', this.input.textContent)
  }

  set value(v) {
    this.input.textContent = v;
  }

  get value() {
    return this.input.textContent;
  }

  focus() {
    this.input.focus();
  }
}