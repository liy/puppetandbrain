import VariableElement from './VariableElement';
import DataType from '../../data/DataType';
import SoundIcon from '../../assets/sound-icon.svg';
import { svgElement } from '../../utils/utils';
import FileButton from '../gadgets/FileButton'

export default class extends VariableElement
{
  constructor(variable) {
    super(variable);
    
    this.type = DataType.AUDIO;

    this.icon.appendChild(svgElement(SoundIcon,{width:18, height:20}));

    this.fileBtn = new FileButton('audio/*', this.variable.data);
    this.content.appendChild(this.fileBtn.element);

    this.fileBtn.on('file.uploaded', ({path, data}) => {
      this.variable.updateSound(path);
    })
  }
}