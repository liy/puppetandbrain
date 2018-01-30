import ElementControlButton from './ElementControlButton';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(null, '🎵');
    this.element.setAttribute('data-title', "Create Sound");
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      type: DataType.SOUND,
      name: null,
      data: null,
    }).processAndSave());
  }
}