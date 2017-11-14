import Task from "./Task";

export default class Branch extends Task
{
  constructor() {
    super();
    
    this.execution.set('true')
    this.execution.set('false')

    // default to be true
    this.variables.condition = true;
  }

  init(data) {
    super.init(data);
    
    this.inputs.add('condition');
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