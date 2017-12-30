export default class APin
{
  constructor(name, flow) {
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.textContent = name;
    this.element.appendChild(this.label);
  }

  canConnect(pin) {
    return pin != null && (pin.type == this.type) && (pin.flow != this.flow);
  }
}