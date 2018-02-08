import Block from "./Block";
import DropDown from '../gadgets/DropDown';
import ColorButton from '../gadgets/ColorButton';

export default class AnimationBlock extends Block
{
  constructor() {
    super()
    
  }

  init(node) {
    super.init(node);

    let dropdown = new DropDown({list: this.node.list, value:node.memory.name});
    this.inputPins.get('name').setGadget(dropdown);
  }
}