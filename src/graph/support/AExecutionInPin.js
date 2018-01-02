import ExecutionInSymbol from "../gadgets/ExecutionInSymbol";
import APin from "./APin";

export default class AExecutionInPin extends APin
{
  constructor(node) {
    super(node, 'in');

    this.symbol = new ExecutionInSymbol(node);
    this.element.appendChild(this.symbol.element)
  }
}