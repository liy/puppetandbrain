import Block from "./Block";
import Toggle from '../gadgets/Toggle';

export default class PlaySoundBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    this.inputPins.get('loop').setGadget(new Toggle());
  }
}