import './AddOutputPin.scss';

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'add-output-pin-container'

    this.pin = document.createElement('div');
    this.pin.className = 'add-output-pin';
    this.element.appendChild(this.pin)

    this.label = document.createElement('span');
    this.label.className = 'label';
    this.label.textContent =  'test'
    this.pin.appendChild(this.label);

    this.head = document.createElement('div');
    this.head.className = 'add-output-head';
    this.pin.appendChild(this.head);
  }
}