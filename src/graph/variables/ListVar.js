import VariableBase from './VariableBase';
import ListIcon from '../../assets/list-icon.svg';
import { svgElement } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    this.icon.appendChild(svgElement(ListIcon,{width:17, height:14}));

    this.name.placeholder = 'list name...'

    this.expand = this.expand.bind(this);
    this.element.addEventListener('mousedown', this.expand);
  }

  expand(e) {
    console.log('down');
  }
}