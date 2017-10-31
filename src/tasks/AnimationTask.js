import Task from './Task'

export default class AnimationTask extends Task
{
  constructor(animationName, actor, id) {
    super(actor, id);

    this.inputs.create('animationName').value = animationName;
  }

  process() {
    this.actor.setAnimation(this.inputs.value('animationName'));
    return Promise.resolve();
  }

  pod() {
    return {
      ...super.pod(),
      animationName: this.inputs.value('animationName')
    }
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}