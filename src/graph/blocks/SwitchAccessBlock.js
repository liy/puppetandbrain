import Block from "./Block";
import RangeField from '../gadgets/RangeField';

export default class extends Block
{
  constructor() {
    super();
  }

  init(node) {
    super.init(node);
    
    let debounceRange = new RangeField({
      value:node.memory.debounce,
      min:0,
      max:10,
      decimalPlaces:1
    });
    let preAcceptanceRange = new RangeField({
      value:node.memory['pre-acceptance'],
      min:0,
      max:5,
      decimalPlaces:1
    });

    this.inputPins.get('debounce').setGadget(debounceRange);
    this.inputPins.get('pre-acceptance').setGadget(preAcceptanceRange);
  }
}