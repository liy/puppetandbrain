import VariableControlButton from './VariableControlButton';
import PipetteIcon from '../../assets/pipette.svg';
import { svgElement } from '../../utils/utils';
import Variable from '../../data/Variable';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(PipetteIcon,{width:16, height:16}));
  }

  pointerDown(e) {
    let v = new Variable();
    v.init({
      brain: BrainGraph.brain.id,
      type: DataType.COLOR,
      name: null,
      data: 0x000000
    })
    BrainGraph.brain.variables.add(v);
  }
}