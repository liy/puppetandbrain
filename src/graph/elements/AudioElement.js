import VariableElement from './VariableElement';
import DataType from '../../data/DataType';
import SoundIcon from '../../assets/sound-icon.svg';
import { svgElement } from '../../utils/utils';
import AudioField from '../gadgets/AudioField'

export default class extends VariableElement
{
  constructor(variable) {
    super(variable);
    
    this.type = DataType.AUDIO;

    this.audioField = new AudioField('audio/*');
    this.content.appendChild(this.audioField.element);

    this.audioField.button.on('file.ready', ({path, data}) => {
      this.variable.updateSound(path);
    })
  }

  createIcon() {
    return svgElement(SoundIcon,{width:18, height:20});
  }
}