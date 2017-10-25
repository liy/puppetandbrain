import Task from './Task'
import {Data, DataType} from '../utils/DataCollection'

export default class AnimationTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    this.inputs.add('animationName', new Data(DataType.TEXT, ''));
  }

  process() {
    this.actor.setAnimation(this.inputs.get('animationName'));
    return Promise.resolve();
  }

  pod() {
    return {
      ...super.pod(),
      target: this.target,
      duration: this.duration
    }
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}