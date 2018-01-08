import './TextField.scss'
import Gadget from "./Gadget";

// FIXME: use span with contentditable=true, it will allow auto expand
// https://stackoverflow.com/questions/7168727/make-html-text-input-field-grow-as-i-type
export default class extends Gadget
{
  constructor(value, placeholderText='...') {
    super()
    this.element.className = 'text-field';

    this.input = document.createElement('span');
    this.input.className = 'data-text'
    this.input.contentEditable = true;
    this.placeholder = placeholderText;
    this.element.appendChild(this.input);

    this.onChange = this.onChange.bind(this);
    this.input.addEventListener('mousedown', e => {
      e.stopPropagation();
    });
  }

  set placeholder(p) {
    this.input.setAttribute('placeholder', p);
  }
  
  onChange(e) {
    this.node.variables[name] = e.target.value;
  }

  init(node, name) {
    super.init(node, name);

    this.input.addEventListener('change', this.onChange);
    this.input.textContent = this.node.variables[name];
  }

  get value() {
    return this.input.textContent;
  }

  set value(v) {
    this.input.textContent = v;
  }
}