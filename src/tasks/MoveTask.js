import Task from './Task';
import LookUp from '../objects/LookUp'

export default class MoveTask extends Task
{
  constructor(ref, target, duration) {
    super();
    this.ref = ref;
    this.target = target;
    this.duration = duration;
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.ref, this.duration/1000, {...this.target, onComplete: resolve});
    })
  }

  serialize() {
    return JSON.stringify({
      class: 'Move',
      target: this.target,
      duration: this.duration,
      ref: this.ref.id
    })
  }

  static deserialize(data) {
    return new MoveTask(LookUp.get(data.ref), data.target, data.duration);
  }
}