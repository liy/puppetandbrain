import Block from "./Block";
import Toggle from '../gadgets/Toggle'

export default class BranchBlock extends Block
{
  constructor() {
    super();

    let pin = this.inputPins.get('condition');
    pin.setGadget(new Toggle());
  }
}