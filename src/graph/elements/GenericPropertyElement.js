import PropertyElement from './PropertyElement';
import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import * as GadgetClasses from '../gadgets';

export default class extends PropertyElement
{
  constructor(actor, {propertyName, descriptor}) {
    super(actor, propertyName, descriptor);
    let value = this.actor[this.propertyName];
    this.gadget = null;
    if(descriptor.gadgetClassName) {
      this.gadget = new GadgetClasses[descriptor.gadgetClassName](value)
    }
    else {
      this.gadget = new GadgetClasses.InputField(value)
      this.gadget.element.classList.add('element-value-field');
    }
    this.content.appendChild(this.gadget.element);

    this.gadget.on('gadget.state.change', value => {
      actor[propertyName] = value;
    })
  }

  destroy() {
    this.gadget.destroy();
    super.destroy();
  }

}