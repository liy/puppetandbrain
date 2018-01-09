import VariableElement from './VariableElement';
import PipetteIcon from '../../assets/pipette.svg';
import { svgElement } from '../../utils/utils';

import ColorButton from '../gadgets/ColorButton';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor() {
    super();
    this.type = DataType.COLOR;

    this.name.placeholder = 'color name...'

    let svg = svgElement(PipetteIcon,{width:16, height:16});
    this.icon.appendChild(svg);

    this.colorButton = new ColorButton();
    this.container.appendChild(this.colorButton.element);
  }
}