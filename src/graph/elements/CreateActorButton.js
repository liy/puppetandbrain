import ElementControlButton from './ElementControlButton';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
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