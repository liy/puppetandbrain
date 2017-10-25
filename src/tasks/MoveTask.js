import Task from './Task';
import {Data, DataType} from '../utils/DataCollection'

export default class MoveTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    this.inputs.add('position', new Data(DataType.NUMBER, {x:actor.x+100,y:actor.y}));
    this.inputs.add('duration', new Data(DataType.NUMBER, 1));
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.actor, this.inputs.get('duration'), {...this.inputs.get('position'), onComplete: resolve});
    })
  }

  pod() {
    return {
      ...super.pod(),
      inputs: {
        position: this.inputs.get('position'),
        duration: this.inputs.get('duration')
      }
    }
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}