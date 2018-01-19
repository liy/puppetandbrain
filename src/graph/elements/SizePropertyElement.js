import PropertyElement from './PropertyElement';
import SizeIcon from '../../assets/size-icon.svg';
import { svgElement } from '../../utils/utils';
import RangeField from '../gadgets/RangeField';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, {name:'size'});

    let svg = svgElement(SizeIcon,{width:18, height:18});
    this.icon.appendChild(svg);

    this.rangeField = new RangeField({value: actor.scale.x, min:-2, max:2, decimalPlaces:2});
    this.content.appendChild(this.rangeField.element);

    this.rangeField.on('gadget.state.change', value => {
      actor.scale.x = value;
      actor.scale.y = value;
    })
  }

}