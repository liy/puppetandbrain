import PropertyElement from './PropertyElement';
import DotIcon from '@/assets/dot.svg';
import { svgElement } from '@/utils/utils';
import * as GadgetClasses from '../gadgets';
import ImageButton from '../gadgets/ImageButton';

export default class extends PropertyElement
{
  constructor(actor, property) {
    super(actor, property.propertyName, property.descriptor);


    this.gadget = new ImageButton(property.data)
    this.content.appendChild(this.gadget.element);

    this.gadget.on('gadget.state.change', ({byteArray, ...other}) => {
      actor.properties.get(this.propertyName).set(other);
    })
  }

  destroy() {
    this.gadget.destroy();
    super.destroy();
  }
}