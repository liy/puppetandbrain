import VariableBase from './VariableBase';
import PositionIcon from '../../assets/position-icon.svg';
import { svgElement } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    let svg = svgElement(PositionIcon,{width:10, height:16});
    this.icon.appendChild(svg);

    this.name.textContent = 'position name'
  }
}