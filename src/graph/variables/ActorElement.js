import VariableElement from './VariableElement';
import ActorIcon from '../../assets/actor.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';

export default class extends VariableElement
{
  constructor() {
    super();
    this.type = DataType.ACTOR;

    this.name.placeholder = 'actor name...'

    // let svg = svgElement(ActorIcon,{width:16, height:16});
    // this.icon.appendChild(svg);
    this.icon.textContent = '🐶';
  }
}