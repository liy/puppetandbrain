import VariableElement from './VariableElement';
import InputField from '../gadgets/InputField';

import DotIcon from '@/assets/dot.svg';
import { svgElement } from '@/utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable, svgElement(DotIcon,{width:10, height:10}));
    this.element.classList.add('generic-element');

    this.valueField = new InputField(variable.data, null, 'value...');
    this.valueField.element.classList.add('element-value-field');
    this.content.appendChild(this.valueField.element);

    this.onValueChange = this.onValueChange.bind(this);
    this.valueField.input.addEventListener('change', this.onValueChange);
  }

  onValueChange(e) {
    // set both actual data and initial data
    this.variable.set(e.target.value);
  }
}