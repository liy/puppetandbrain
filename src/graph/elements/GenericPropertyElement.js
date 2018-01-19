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

    let gadget = null;
    if(descriptor.gadgetClass) {
      gadget = new GadgetClasses[descriptor.gadgetClass](descriptor.value)
    }
    else {
      gadget = new GadgetClasses.ValueField(descriptor.value)
    }
    this.content.appendChild(gadget.element);

    gadget.on('gadget.state.change', value => {
      actor[descriptor.property] = value;
    })
  }

}