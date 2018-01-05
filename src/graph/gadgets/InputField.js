import './InputField.scss'
import Gadget from "./Gadget";

// FIXME: use span with contentditable=true, it will allow auto expand
// https://stackoverflow.com/questions/7168727/make-html-text-input-field-grow-as-i-type
export default class extends Gadget
{
  constructor() {
    super()
    this.element.className = 'input-container';

    this.input = document.createElement('span');
    this.input.className = 'data-input'
    this.input.contentEditable = true;
    this.input.setAttribute('placeholder', '...')
    this.element.appendChild(this.input);

    this.onChange = this.onChange.bind(this);

    this.input.addEventListener('mousedown', e => {
      e.stopPropagation();
    });
  }
  
  onChange(e) {
    this.node.variables[name] = e.target.value;
  }

  init(node, name) {
    super.init(node, name);

    this.input.addEventListener('change', this.onChange);
    this.input.textContent = this.node.variables[name];
  }
}