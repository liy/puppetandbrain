import Block from "./Block";
import PositionField from '../gadgets/PositionField';

export default class extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);
    
    this.inputPins.get('position').setGadget(new PositionField(0, 0));
  }
}