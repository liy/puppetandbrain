import Task from './Task'

export default class Animation extends Task
{
  constructor(id) {
    super(id);

    this.inputs.addInput('name');
  }

  run() {
    super.run()

    this.owner.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }
}