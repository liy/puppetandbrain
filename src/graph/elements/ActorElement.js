import VariableElement from './VariableElement';
import ActorIcon from '../../assets/actor.svg';
import { svgElement } from '../../utils/utils';
import DataType from '../../data/DataType';
import ActorPicker from '../gadgets/ActorPicker';

export default class extends VariableElement
{
  constructor(variable) {
    super(variable);
    this.type = DataType.ACTOR;
    this.icon.textContent = '🐶';
    
    this.actorPicker = new ActorPicker(this.variable.data);
    this.content.appendChild(this.actorPicker.element);

    this.actorPicker.on('gadget.state.change', actorID => {
      this.variable.data = actorID;
    })
  }

  destroy() {
    this.actorPicker.destroy();
    super.destroy();
  }

  createIcon() {
    return '🐶';
  }
}