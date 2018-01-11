import VariableElement from './VariableElement';
import PositionIcon from '../../assets/position-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';
import PositionField from './PositionField';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable);
    
    this.type = DataType.VEC2;

    let svg = svgElement(PositionIcon,{width:10, height:16});
    this.icon.appendChild(svg);

    this.positionField = new PositionField(this.variable.data.x, this.variable.data.y);
    this.content.appendChild(this.positionField.element);

    this.xChange = this.xChange.bind(this)
    this.yChange = this.yChange.bind(this)

    this.positionField.xInput.addEventListener('change', this.xChange);
    this.positionField.yInput.addEventListener('change', this.yChange);
  }

  xChange(e) {
    // set both actual data and initial data
    this.variable.data.x = Number(e.target.value);
  }

  yChange(e) {
    this.variable.data.y = Number(e.target.value);
  }
}