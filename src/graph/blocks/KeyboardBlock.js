import Block from "./Block";
import KeyNameCatcher from '../gadgets/KeyNameCatcher';

export default class KeyboardBlock extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);

    this.inputPins.get('key name').setGadget(new KeyNameCatcher(node.memory['key name']));
  }
}