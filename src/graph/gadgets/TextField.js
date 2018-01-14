import './TextField.scss'
import Gadget from "./Gadget";

// use span with contentditable=true, it allows auto expand
// https://stackoverflow.com/questions/7168727/make-html-text-input-field-grow-as-i-type
export default class extends Gadget
{
  constructor(value, placeholderText='...') {
    super()
    this.element.className = 'text-field';

    this.input = document.createElement('span');
    this.input.className = 'data-text'
    this.input.contentEditable = true;
    this.value = value;
    this.placeholder = placeholderText;
    this.element.appendChild(this.input);

    this.onChange = this.onChange.bind(this);
    this.input.addEventListener('change', this.onChange);

    this.input.addEventListener('mousedown', e => {
      e.stopPropagation();
    });
  }

  destroy() {
    super.destroy();
    this.input.removeEventListener('change', this.onChange);
  }

  set placeholder(p) {
    this.input.setAttribute('placeholder', p);
  }
  
  onChange(e) {
    this.emit('gadget.state.change', e.target.value)
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