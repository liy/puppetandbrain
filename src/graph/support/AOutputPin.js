import ADataPin from "./ADataPin";
import OutputSymbol from "./OutputSymbol";

export default class AOutputPin extends ADataPin
{
  constructor(name) {
    super(name, 'out')
  }
}