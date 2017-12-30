import ExecutionSymbol from "../gadgets/ExecutionSymbol";
import APin from "./APin";

export default class AExecutionPin extends APin
{
  constructor(name, flow) {
    super(name, flow);

    this.symbol = new ExecutionSymbol(flow);
    this.element.appendChild(this.symbol.element)
  }
}