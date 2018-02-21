import VariableElement from './VariableElement';
import PositionIcon from '@/assets/position-icon.svg';
import { svgElement, numericVector } from '@/utils/utils';
import DataType from '../../data/DataType';
import PositionField from '../gadgets/PositionField';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable, svgElement(PositionIcon,{width:10, height:16}));
    
    this.type = DataType.VEC2;

    this.positionField = new PositionField(numericVector(this.variable.data));
    this.content.appendChild(this.positionField.element);

    this.positionField.on('gadget.state.change', position => {
      this.variable.data = position;
    })
  }

  destroy() {
    this.positionField.destroy();
    super.destroy();
  }
}