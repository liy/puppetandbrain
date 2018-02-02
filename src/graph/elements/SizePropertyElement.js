import PropertyElement from './PropertyElement';
import SizeIcon from '../../assets/size-icon.svg';
import { svgElement } from '../../utils/utils';
import RangeField from '../gadgets/RangeField';
import IconStore from '../../ui/IconStore';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, 'scale', {iconID:IconStore.SIZE});

    this.rangeField = new RangeField({value: actor.scale.x, min:-1, max:3, decimalPlaces:2});
    this.content.appendChild(this.rangeField.element);

    this.rangeField.on('gadget.state.change', value => {
      actor.scale.x = value;
      actor.scale.y = value;
    })
  }

  destroy() {
    this.rangeField.destroy();
    super.destroy();
  }
}