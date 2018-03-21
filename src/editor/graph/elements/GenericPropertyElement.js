import PropertyElement from './PropertyElement';
import DotIcon from '@/assets/dot.svg';
import { svgElement } from '@/utils/utils';
import * as GadgetClasses from '../gadgets';
import DataType from '../../data/DataType';
import InputField from '../gadgets/InputField';
import TextField from '../gadgets/TextField';
import ActorPicker from '../gadgets/ActorPicker';
import ColorButton from '../gadgets/ColorButton';
import Vec2Field from '../gadgets/Vec2Field';
import AudioField from '../gadgets/AudioField';
import ImageButton from '../gadgets/ImageButton';
import Toggle from '../gadgets/Toggle';

import * as gadgetClasses from '../gadgets';

export default class extends PropertyElement
{
  constructor(actor, property) {
    super(actor, property.propertyName, property.descriptor);

    let data = this.actor[this.propertyName];
    this.gadget = null;
    if(property.descriptor.gadgetClassName) {
      this.gadget = new gadgetClasses[property.descriptor.gadgetClassName](property.descriptor.data);
    }
    else {
      switch(property.descriptor.type) {
        case DataType.GENERIC:
          this.gadget = new TextField(data);
          break;
        case DataType.BOOLEAN:
          this.gadget = new Toggle(data);
          break;
        case DataType.DOUBLE:
          this.gadget = new InputField(data, 'number');
          this.gadget.input.step = 0.01;
          break;
        case DataType.INTEGER:
          this.gadget = new InputField(data, 'number');
          break;
        case DataType.STRING:
          this.gadget = new TextField(data);
          break;
        case DataType.ACTOR:
          this.gadget = new ActorPicker(data);
          break;
        case DataType.COLOR:
          this.gadget = new ColorButton(data);
          break;
        case DataType.ARRAY:
          // this.gadget = new ColorButton(data);
          break;
        case DataType.VEC2:
          this.gadget = new Vec2Field(data);
          break;
        case DataType.MAP:
          // this.gadget = new TextField(data);
          break;
        case DataType.AUDIO:
          this.gadget = new AudioField(data||{});
          break;
        case DataType.IMAGE:
          this.gadget = new ImageButton(data||{});
          break;
        default:
          this.gadget = new TextField(data);
          break;
      }
    }

    this.content.appendChild(this.gadget.element);

    this.gadget.on('gadget.state.change', data => {
      actor.properties.get(this.propertyName).set(data);
    })
  }

  destroy() {
    this.gadget.destroy();
    super.destroy();
  }

}