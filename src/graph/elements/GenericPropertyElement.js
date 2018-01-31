import PropertyElement from './PropertyElement';
import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import * as GadgetClasses from '../gadgets';

export default class extends PropertyElement
{
  constructor(actor, descriptor) {
    super(actor, descriptor);

    let value = this.actor[descriptor.property];
    this.gadget = null;
    if(descriptor.gadgetClass) {
      this.gadget = new GadgetClasses[descriptor.gadgetClass](value)
    }
    else {
      this.gadget = new GadgetClasses.ValueField(value)
    }
    this.content.appendChild(this.gadget.element);

    this.gadget.on('gadget.state.change', value => {
      actor[descriptor.property] = value;
    })
  }

  destroy() {
    this.gadget.destroy();
    super.destroy();
  }

}