import Block from "./Block";
import DropDown from '../gadgets/DropDown';

export default class AnimationBlock extends Block
{
  constructor() {
    super()
    
  }

  init(node) {
    super.init(node);

    let dropdown = new DropDown();
    this.inputPins.get('name').setGadget(dropdown);
    // this.element.appendChild(dropdown.element)

    node.owner.getAnimations().then(animations => {
      let names = animations.map(animation => animation.name)
      dropdown.setList(names, node.memory.name);
    })
  }
}