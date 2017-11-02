import Task from './Task'

export default class AnimationTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    this.properties = {
      name: ''
    }
    this.inputs.create('name');
  }

  get name() {
    return this.inputs.value('name') || this.properties.name;
  }

  process() {
    this.actor.setAnimation(this.name);
    return Promise.resolve();
  }
}