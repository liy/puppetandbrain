import VariableBase from './VariableBase';
import MapIcon from '../../assets/dictionary-icon.svg';
import { svgElement } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    this.icon.appendChild(svgElement(MapIcon,{width:16, height:16}));

    this.name.textContent = 'list name'
  }
}