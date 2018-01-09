import VariableElement from './VariableElement';
import PositionIcon from '../../assets/position-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor() {
    super();
    
    this.type = DataType.VEC2;

    let svg = svgElement(PositionIcon,{width:10, height:16});
    this.icon.appendChild(svg);

    this.name.placeholder = 'position name...'
  }
}