import './ValueField.scss'
import InputField from '../gadgets/InputField';
// import {svgElement} from '../../utils/utils';
// import CrossIcon from '../../assets/cross.svg';

// TODO: find a better name, maybe ElementField?
export default class extends InputField
{
  constructor(v, p='value...') {
    super(v, p);

    this.element.classList.add('value-field');

    // this.icon = svgElement(CrossIcon, {width:10, height:10});
    // this.element.appendChild(this.icon);
  }
}