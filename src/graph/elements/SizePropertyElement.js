import PropertyElement from './PropertyElement';
import SizeIcon from '../../assets/size-icon.svg';
import { svgElement } from '../../utils/utils';
import PositionField from '../gadgets/PositionField';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, {name:'size'});

    let svg = svgElement(SizeIcon,{width:18, height:18});
    this.icon.appendChild(svg);

    this.positionField = new PositionField(actor.scale);
    this.content.appendChild(this.positionField.element);
    this.positionField.picker.style.display = 'none'

    this.positionField.on('gadget.state.change', value => {
      actor.scale = value;
    })
  }

}