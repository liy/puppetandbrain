import Task from './Task'

export default class AnimationTask extends Task
{
  constructor(name, actor, id) {
    super(actor, id);

  }

  init(data) {
    super.init(data);
    this.inputs.create('name', data.name);
  }

  process() {
    this.actor.setAnimation(this.inputs.value('name'));
    return Promise.resolve();
  }
}