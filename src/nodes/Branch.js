import Task from "./Task";

export default class Branch extends Task
{
  constructor(id) {
    super(id);

    this.execution.remove('default');
    this.execution.set('true')
    this.execution.set('false')

    // default to be true
    this.variables.condition = true;
    this.inputs.addName('condition');
  }

  run() {
    if(this.inputs.value('condition')) {
      this.execution.run('true')
    }
    else {
      this.execution.run('false');
    }
  }
}