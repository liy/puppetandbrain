import Task from './Task';
import LookUp from '../objects/LookUp'

export default class MoveTask extends Task
{
  constructor(target, dest, duration) {
    super();
    this.target = target;
    this.dest = dest;
    this.duration = duration;
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.target, this.duration/1000, {...this.dest, onComplete: resolve});
    })
  }

  serialize() {
    return JSON.stringify({
      class: Move,
      dest: this.dest,
      duration: this.duration,
      target: this.target.id
    })
  }

  static deserialize(data) {
    return new MoveTask(LookUp.get(data.target), data.dest, data.duration);
  }
}