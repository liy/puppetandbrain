import Task from './Task';

export default class Wait extends Task
{
  constructor(id) {
    super(id);
    
    this.inputs.add('seconds');
  }

  init(pod) {
    super.init(pod);
    this.variables.seconds = pod.seconds || 2;
  }
  
  run() {
    super.run()
    setTimeout(() => {
      this.execution.run();
    }, this.inputs.value('seconds')*1000);
  }
}