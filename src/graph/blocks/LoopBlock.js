import Block from "./Block";
import Toggle from '../gadgets/Toggle';

export default class LoopBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);
    
    this.inputPins.get('condition').setGadget(new Toggle());
  }
}