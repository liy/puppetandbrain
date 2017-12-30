import './InputField.scss'
import Gadget from "./Gadget";

export default class extends Gadget
{
  constructor() {
    super()
    this.element.className = 'input-container';

    this.input = document.createElement('input');
    this.element.appendChild(this.input)
  }
}