import VariableElement from './VariableElement';
import ValueField from '../gadgets/ValueField';

import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable, svgElement(DotIcon,{width:10, height:10}));

    this.valueField = new ValueField(variable.data);
    this.content.appendChild(this.valueField.element);

    this.onValueChange = this.onValueChange.bind(this);
    this.valueField.input.addEventListener('change', this.onValueChange);
  }

  onValueChange(e) {
    // set both actual data and initial data
    this.variable.set(e.target.value);
  }
}