import DataSymbol from "./DataSymbol";

export default class
{
  constructor(name, flow) {
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.textContent = name;
    this.element.appendChild(this.label);

    this.symbol = new DataSymbol(flow);
    this.element.appendChild(this.symbol.element);
  }

  canConnect(pin) {
    return pin != null && (pin.type == this.type) && (pin.flow != this.flow);
  }
}