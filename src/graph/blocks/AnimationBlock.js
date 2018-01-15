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

    let dropdown = new DropDown();
    this.inputPins.get('name').setGadget(dropdown);

    node.owner.getAnimations().then(animations => {
      let names = animations.map(animation => animation.name)
      dropdown.setList(names, node.memory.name);
    })
  }
}