import ElementControlButton from './ElementControlButton';
import SoundIcon from '@/assets/sound-icon.svg';
import DataType from '../../data/DataType';
import { svgElement } from '@/utils/utils';

export default class extends ElementControlButton
{
  constructor() {
    super(svgElement(SoundIcon,{width:18, height:20}));
    this.element.setAttribute('data-title', "Create Audio");
  }

  pointerDown(e) {
    EditorHistory.push(Commander.create('CreateVariable', {
      brainID: BrainGraph.brain.id,
      name: null,
      data: null,
      descriptor: {
        type: DataType.AUDIO,
      }
    }).processAndSave());
  }
}