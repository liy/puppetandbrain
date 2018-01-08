import VariableBase from './VariableBase';
import VariableValue from './VariableValue';

import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    this.icon.appendChild(svgElement(DotIcon,{width:10, height:10}));

    this.name.placeholder = 'name...'

    this.input = new VariableValue('test');
    this.container.appendChild(this.input.element);
  }
}