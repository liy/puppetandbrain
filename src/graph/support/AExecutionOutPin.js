import ExecutionOutSymbol from "../gadgets/ExecutionOutSymbol";
import APin from "./APin";

export default class AExecutionOutPin extends APin
{
  constructor(node, name) {
    super(node, name, 'out');

    this.symbol = new ExecutionOutSymbol(node, name);
    this.element.appendChild(this.symbol.element)
  }
}