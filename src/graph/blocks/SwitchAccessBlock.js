import Block from "./Block";
import Bar from '../gadgets/Bar';

export default class extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);
    
    let debounceBar = new Bar();
    debounceBar.min = 0;
    debounceBar.max = 10;
    debounceBar.decimalPlaces = 0;

    this.inputPins.get('debounce').setGadget(new Bar());
    this.inputPins.get('pre-acceptance').setGadget(new Bar());
  }
}