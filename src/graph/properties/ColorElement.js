import VariableElement from './VariableElement';
import BucketIcon from '../../assets/paint-bucket.svg';
import { svgElement } from '../../utils/utils';

import ColorButton from '../gadgets/ColorButton';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable);
    this.type = DataType.COLOR;

    let svg = svgElement(BucketIcon, {width:18, height:18});
    this.icon.appendChild(svg);

    this.colorButton = new ColorButton();
    this.content.appendChild(this.colorButton.element);
    this.colorButton.element.style.marginRight = '5px'
    
    this.colorButton.on('color.change', color => {
      this.variable.data = color;
      console.log(this.variable.data);
    })
  }
}