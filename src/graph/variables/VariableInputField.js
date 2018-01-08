import './VariableInputField.scss'
import InputField from '../gadgets/InputField';
import {svgElement} from '../../utils/utils';
import CrossIcon from '../../assets/cross.svg';

export default class extends InputField
{
  constructor(v, p) {
    super(v, p);

    this.element.classList.add('variable-input-field');

    this.icon = svgElement(CrossIcon, {width:10, height:10});
    this.element.appendChild(this.icon);
  }
}