import './PropertyElement.scss'
import PropertyElement from './PropertyElement'
import PositionIcon from '../../assets/position-icon.svg';
import { svgElement } from '../../utils/utils';
import PositionField from '../gadgets/PositionField';

export default class extends PropertyElement
{
  constructor(actor) {
    super(actor, {name:'position'})

    this.icon.appendChild(svgElement(PositionIcon,{width:10, height:16}));

    this.positionField = new PositionField(actor.position);
    this.content.appendChild(this.positionField.element);

    this.positionField.on('gadget.state.change', position => {
      this.actor.position.x = position.x;
      this.actor.position.y = position.y;
    })
  }
}