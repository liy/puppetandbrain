import VariableBase from './VariableBase';
import PipetteIcon from '../../assets/pipette.svg';
import { svgElement } from '../../utils/utils';

import ColorButton from '../gadgets/ColorButton';

export default class extends VariableBase
{
  constructor() {
    super();

    this.name.placeholder = 'color...'

    let svg = svgElement(PipetteIcon,{width:16, height:16});
    this.icon.appendChild(svg);

    this.colorButton = new ColorButton();
    this.container.appendChild(this.colorButton.element);
  }
}