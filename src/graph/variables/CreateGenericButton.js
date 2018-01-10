import VariableControlButton from './VariableControlButton';
import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';
import Variable from '../../data/Variable';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(DotIcon,{width:10, height:10}));
  }

  pointerDown(e) {
    let v = new Variable();
    v.init({
      brain: BrainGraph.brain.id,
      type: DataType.GENERIC,
      name: null,
      data: null,
    })
    BrainGraph.brain.variables.add(v);
  }
}