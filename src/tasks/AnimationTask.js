import Task from './Task'

export default class AnimationTask extends Task
{
  constructor(data) {
    super(data);

    this.params = {
      animationName: data.animationName,
    }
  }

  process(params) {
    // override hardcoded animation name with passed params
    this.params.animationName = params.animationName;
    this.actor.setAnimation(this.params.animationName);
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