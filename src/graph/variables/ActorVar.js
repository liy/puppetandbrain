import VariableBase from './VariableBase';
import ActorIcon from '../../assets/actor.svg';
import { svgElement } from '../../utils/utils';

export default class extends VariableBase
{
  constructor() {
    super();

    this.name.placeholder = 'actor...'

    let svg = svgElement(ActorIcon,{width:16, height:16});
    this.icon.appendChild(svg);
  }
}