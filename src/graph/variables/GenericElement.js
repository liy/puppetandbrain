import VariableElement from './VariableElement';
import ValueField from './ValueField';

import DotIcon from '../../assets/dot.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor() {
    super();

    this.type = DataType.GENERIC;

    this.icon.appendChild(svgElement(DotIcon,{width:10, height:10}));

    this.name.placeholder = 'name...'

    this.input = new ValueField('test');
    this.container.appendChild(this.input.element);
  }
}