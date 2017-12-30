import './InputField.scss'
import Gadget from "./Gadget";

export default class extends Gadget
{
  constructor() {
    super()
    this.element.className = 'input-container';
    this.element.style.display = 'none';

    this.input = document.createElement('input');
    this.input.setAttribute('placeholder', '...')
    this.element.appendChild(this.input);

    this.input.addEventListener('mousedown', e => {
      e.stopPropagation();
    })
  }
}