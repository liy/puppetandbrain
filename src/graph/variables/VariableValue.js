import './VariableValue.scss'
import InputField from './InputField';
import {svgElement} from '../../utils/utils';
import CrossIcon from '../../assets/cross.svg';

export default class extends InputField
{
  constructor(v, p) {
    super(v, p);

    this.placeholder = 'value...'

    this.element.classList.add('variable-value');

    this.icon = svgElement(CrossIcon, {width:10, height:10});
    this.element.appendChild(this.icon);
  }
}