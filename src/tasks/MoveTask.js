import Task from './Task';

export default class MoveTask extends Task
{
  constructor(data) {
    super(data);
    this.ref = data.ref;
    this.target = data.target;
    this.duration = data.duration;
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.ref, this.duration/1000, {...this.target, onComplete: resolve});
    })
  }

  pod() {
    return {
      ...super.pod(),
      target: this.target,
      duration: this.duration,
      ref: this.ref.id
    }
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}