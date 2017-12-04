import Task from "./Task";

export default class Branch extends Task
{
  constructor(id) {
    super(id);

    this.execution.remove('default');
    this.execution.set('true')
    this.execution.set('false')

    this.inputs.addInput('condition');
  }

  run() {
    super.run();
    
    let condition = this.inputs.value('condition');
    if(condition === 'true' || condition === true ) {
      this.execution.run('true')
    }
    else {
      this.execution.run('false');
    }
  }
}