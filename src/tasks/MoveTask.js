import Task from './Task';
import { Data } from '../Data';

export default class MoveTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    this.inputs.add('duration', new Data(data.duration || 1));
    this.inputs.add('position', new Data(data.position || {
      x: this.actor.x+100, 
      y: this.actor.y
    }));
  }

  process() {
    let pos = this.inputs.value('position');

    return new Promise(resolve => {
      TweenLite.to(this.actor, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: resolve});
    })
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}