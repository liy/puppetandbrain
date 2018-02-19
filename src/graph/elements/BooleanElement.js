import VariableElement from './VariableElement';
import Toggle from '../gadgets/Toggle';

import BooleanIcon from '../../assets/boolean-icon.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable, svgElement(BooleanIcon, {width:15, height:10}));

    this.toggle = new Toggle(variable.data);
    this.content.appendChild(this.toggle.element);

    this.onValueChange = this.onValueChange.bind(this);
    this.toggle.on('gadget.state.change', this.onValueChange);
  }

  onValueChange(value) {
    // set both actual data and initial data
    this.variable.set(value);
  }
}