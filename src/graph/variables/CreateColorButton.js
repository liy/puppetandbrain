import VariableControlButton from './VariableControlButton';
import PipetteIcon from '../../assets/pipette.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(svgElement(PipetteIcon,{width:16, height:16}));
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brain: BrainGraph.brain.id,
      type: DataType.COLOR,
      name: null,
      data: 0x000000
    }).processAndSave());
  }
}