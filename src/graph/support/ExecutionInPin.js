import ExecutionInSymbol from "./ExecutionInSymbol";
import ExecutionPin from "./ExecutionPin";

export default class extends ExecutionPin
{
  constructor() {
    super('', 'in');
    
    this.symbol = new ExecutionInSymbol();
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