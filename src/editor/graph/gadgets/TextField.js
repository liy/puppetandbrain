import './TextField.scss'
import Gadget from "./Gadget";

// use span with contentditable=true, it allows auto expand
// https://stackoverflow.com/questions/7168727/make-html-text-input-field-grow-as-i-type
export default class extends Gadget
{
  constructor(value, placeholder='...') {
    super()
    this.element.classList.add('text-field');

    this.maxChars = 30;

    this.input = document.createElement('span');
    this.input.className = 'data-text'
    this.input.contentEditable = true;
    this.value = value;
    this.placeholder = placeholder;
    this.element.appendChild(this.input);

    this.onInput = this.onInput.bind(this);
    this.input.addEventListener('input', this.onInput);

    this.input.addEventListener('keydown', e => {
      if(e.keyCode === 13) {
        e.preventDefault();
      }

      this.beforeEditText = this.input.textContent;
    })

    this.input.addEventListener('paste', e => {
      // prevent formated paste
      e.preventDefault();
      this.value = e.clipboardData.getData('text/plain');
    })

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
    // max char limit
    if(this.value.length > this.maxChars) {
      this.input.textContent = this.beforeEditText;
    }
    this.emit('gadget.state.change', this.input.textContent)
  }

  set value(v) {
    // when manual setting, also limit the text
    if(v) v = v.substr(0, this.maxChars)
    this.input.textContent = v;
  }

  get value() {
    return this.input.textContent;
  }

  focus() {
    this.input.focus();
  }
}