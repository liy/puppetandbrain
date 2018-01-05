import ExecutionInSymbol from "./ExecutionInSymbol";
import APin from "./APin";

export default class AExecutionInPin extends APin
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