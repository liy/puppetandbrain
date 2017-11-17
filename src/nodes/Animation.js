import Task from './Task'

export default class Animation extends Task
{
  constructor(id) {
    super(id);

    this.inputs.add('name');
  }
  
  run() {
    super.run()

    this.actor.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }
}