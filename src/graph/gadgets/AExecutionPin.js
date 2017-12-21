import ExecutionSymbol from "./ExecutionSymbol";

export default class AExecutionPin
{
  constructor(name, flow) {
    this.element = document.createElement('div');

    this.label = document.createElement('span');
    this.label.textContent = name;
    this.element.appendChild(this.label);

    this.symbol = new ExecutionSymbol(flow);
    this.element.appendChild(this.symbol.element)
  }
}