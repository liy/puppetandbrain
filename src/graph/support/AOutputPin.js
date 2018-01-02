import ADataPin from "./ADataPin";
import OutputSymbol from "../gadgets/OutputSymbol";

export default class AOutputPin extends ADataPin
{
  constructor(name) {
    super(name, 'out')

    this.symbol = new OutputSymbol(name);
    this.head.appendChild(this.symbol.element);
  }

  init(node) {
    super.init(node);
    this.symbol.init(node);
  }
}