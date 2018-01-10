import VariableControlButton from './VariableControlButton';
import PositionIcon from '../../assets/position-icon.svg';
import { svgElement } from '../../utils/utils';
import Variable from '../../data/Variable';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(PositionIcon,{width:10, height:16}));
  }

  pointerDown(e) {
    let v = new Variable();
    v.init({
      brain: BrainGraph.brain.id,
      type: DataType.VEC2,
      name: null,
      data: {
        x: 0,
        y: 0.
      }
    })
    BrainGraph.brain.variables.add(v);
  }
}