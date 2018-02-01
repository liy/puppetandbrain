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

    this.audioField = new AudioField(variable.data);
    this.content.appendChild(this.audioField.element);

    // Note that I removed byte array from the file data
    this.audioField.button.on('file.ready', ({byteArray, ...other}) => {
      this.variable.data = other
    })
  }

  createIcon() {
    return svgElement(SoundIcon,{width:18, height:20});
  }
}