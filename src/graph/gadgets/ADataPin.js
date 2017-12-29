import DataHead from './DataHead';

export default class
{
  constructor(name, flow) {
    this.element = document.createElement('div');

    // contains symbol or input gadget
    this.head = new DataHead(flow);
    this.element.appendChild(this.head.element);

    this.label = document.createElement('span');
    this.label.textContent = name;
    this.element.appendChild(this.label);
  }

  canConnect(pin) {
    return pin != null && (pin.type == this.type) && (pin.flow != this.flow);
  }
}