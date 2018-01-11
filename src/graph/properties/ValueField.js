import './ValueField.scss'
import InputField from './InputField';
import {svgElement} from '../../utils/utils';
import CrossIcon from '../../assets/cross.svg';

export default class extends InputField
{
  constructor(v, p='value...') {
    super(v, p);

    this.element.classList.add('value-field');

    this.icon = svgElement(CrossIcon, {width:10, height:10});
    this.element.appendChild(this.icon);
  }
}