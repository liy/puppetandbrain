import './AddOutputPin.scss';
import InputField from '../gadgets/InputField';

export default class
{
  constructor(node) {
    this.element = document.createElement('div');
    this.element.className = 'add-output-pin-container'

    this.pin = document.createElement('div');
    this.pin.className = 'add-output-pin';
    this.element.appendChild(this.pin)

    this.textField = new InputField();
    this.pin.appendChild(this.textField.element);

    this.head = document.createElement('div');
    this.head.className = 'add-output-head';
    this.pin.appendChild(this.head);
  }
}