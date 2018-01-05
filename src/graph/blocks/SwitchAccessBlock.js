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
    debounceBar.decimalPlaces = 1;

    
    let preAcceptanceBar = new Bar();
    preAcceptanceBar.min = 0;
    preAcceptanceBar.max = 5;
    preAcceptanceBar.decimalPlaces = 1;

    this.inputPins.get('debounce').setGadget(debounceBar);
    this.inputPins.get('pre-acceptance').setGadget(preAcceptanceBar);
  }
}