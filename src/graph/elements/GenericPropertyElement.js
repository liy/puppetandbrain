import PropertyElement from './PropertyElement';
import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import * as GadgetClasses from '../gadgets';
import IconStore from '../../ui/IconStore';

export default class extends PropertyElement
{
  constructor(actor, descriptor) {
    super(actor, descriptor);

    let icon = IconStore.get(descriptor.iconID);
    if(typeof icon == 'string') {
      this.icon.textContent = icon;
    }
    else {
      this.icon.appendChild(icon);
    }

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