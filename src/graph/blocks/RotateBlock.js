import Block from "./Block";
import DropDown from '../gadgets/DropDown';

export default class RotateBlock extends Block
{
  constructor() {
    super()
    
  }

  init(node) {
    super.init(node);

    let dropdown = new DropDown({list: this.node.list, value:node.memory.direction});
    this.inputPins.get('direction').setGadget(dropdown);
  }
}