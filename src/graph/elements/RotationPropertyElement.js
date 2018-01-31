import PropertyElement from './PropertyElement';
import RotationIcon from '../../assets/rotation-icon.svg';
import { svgElement, toDegree, toRadian } from '../../utils/utils';
import RangeField from '../gadgets/RangeField';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, {name:'rotation'});

    this.icon.appendChild(this.createIcon());

    this.rangeField = new RangeField({value:actor.rotation*toDegree, min:-360, max:360, decimalPlaces:0});
    this.content.appendChild(this.rangeField.element);

    this.rangeField.on('gadget.state.change', value => {
      actor.rotation = Number(value)*toRadian;
    })
  }

  destroy() {
    this.rangeField.destroy();
    super.destroy();
  }

  createIcon() {
    return svgElement(RotationIcon,{width:18, height:18})
  }
}