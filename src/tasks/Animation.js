import Task from './Task'

export default class Animation extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    this.variables.name = data.name;

    this.inputs.add('name');
  }
  
  run() {
    super.run()

    this.actor.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }
}