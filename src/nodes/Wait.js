import Task from './Task';

export default class Wait extends Task
{
  constructor() {
    super();
    this.inputs.add('seconds');
  }

  init(data) {
    super.init(data);
    this.variables.seconds = data.seconds || 2;
  }
  
  run() {
    super.run()
    setTimeout(() => {
      this.execution.run();
    }, this.inputs.value('seconds')*1000);
  }
}