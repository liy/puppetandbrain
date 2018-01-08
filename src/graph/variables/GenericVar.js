import VariableBase from './VariableBase';
import VariableInputField from './VariableInputField';

import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    this.icon.appendChild(svgElement(DotIcon,{width:10, height:10}));

    this.name.textContent = 'variable name'

    this.input = new VariableInputField('test');
    this.container.appendChild(this.input.element);
  }
}