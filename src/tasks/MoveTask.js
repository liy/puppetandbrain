import Task from './Task';
import { Accessor } from '../Data';

export default class MoveTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    this.variables.position = data.position || {x:this.actor.x+100, y:this.actor.y};
    this.variables.duration = 1;

    this.accessors.add('position', new Accessor('position', this));
    this.accessors.add('duration', new Accessor('duration', this));
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.actor, this.accessors.value('duration'), {...this.accessors.value('position'), ease:Linear.easeNone, onComplete: resolve});
    })
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}