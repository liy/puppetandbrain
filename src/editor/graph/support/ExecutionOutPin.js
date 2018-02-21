import ExecutionOutSymbol from "./ExecutionOutSymbol";
import ExecutionPin from "./ExecutionPin";

export default class extends ExecutionPin
{
  constructor(name) {
    super(name, 'out');

    this.symbol = new ExecutionOutSymbol(name);
    this.element.appendChild(this.symbol.element)
  }

  init(node) {
    super.init(node);
    this.symbol.init(node);
  }

  refreshSymbol() {
    this.symbol.refresh();
  }

  drawConnection() {
    this.symbol.drawConnection();
  }
}