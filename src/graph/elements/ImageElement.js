import VariableElement from './VariableElement';
import DataType from '../../data/DataType';
import ImageButton from '../gadgets/ImageButton';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable, '🖼️');
    this.type = DataType.IMAGE;

    this.gadget = new ImageButton(this.variable.data||{})
    this.content.appendChild(this.gadget.element);

    // Note that I removed byte array from the file data
    this.gadget.on('gadget.state.change', ({byteArray, ...other}) => {
      this.variable.data = other
    })
  }
}