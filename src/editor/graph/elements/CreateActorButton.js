import ElementControlButton from './ElementControlButton';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(null, '🐶');
    this.element.setAttribute('data-title', "Create puppet reference");
  }

  pointerDown(e) {
    ActivityManager.history.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: 0,
      descriptor: {
        type: DataType.ACTOR,
      }
    }).processAndSave());
  }
}