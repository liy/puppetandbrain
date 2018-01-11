import VariableControlButton from './VariableControlButton';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(null, '🐶');
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brain: BrainGraph.brain.id,
      type: DataType.ACTOR,
      name: null,
      data: 0,
    }).processAndSave());
  }
}