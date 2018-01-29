import ElementControlButton from './ElementControlButton';
import DataType from '../../data/DataType';

export default class extends ElementControlButton
{
  constructor() {
    super(null, '🐶');
    this.element.setAttribute('data-title', "Create puppet reference");
  }

  pointerDown(e) {
    History.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      type: DataType.ACTOR,
      name: null,
      data: 0,
    }).processAndSave());
  }
}