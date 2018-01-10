import VariableControlButton from './VariableControlButton';

import ActorVariable from '../../data/ActorVariable';
import DataType from '../../data/DataType';

export default class extends VariableControlButton
{
  constructor() {
    super(null, '🐶');
  }

  pointerDown(e) {
    let v = new ActorVariable();
    v.init({
      brain: BrainGraph.brain.id,
      type: DataType.ACTOR
    })
    BrainGraph.brain.variables.add(v);
  }
}