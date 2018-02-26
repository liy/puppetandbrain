import ElementControlButton from './ElementControlButton';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(null, '🖼️');
    this.element.setAttribute('data-title', "Create Image");
  }

  pointerDown(e) {
    ActivityManager.history.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: null,
      descriptor: {
        type: DataType.IMAGE,
      }
    }).processAndSave());
  }
}