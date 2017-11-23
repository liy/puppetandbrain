import Task from './Task';

export default class Wait extends Task
{
  constructor(id) {
    super(id);

    this.inputs.addInput('seconds')
  }

  init(pod) {
    super.init(pod);
    this.variables.seconds = pod.seconds || 2;
  }

  destroy() {
    super.destroy();
    clearTimeout(this.timeoutID);
  }

  terminate() {
    super.terminate();
    clearTimeout(this.timeoutID);
  }

  run() {
    super.run()

    this.timeoutID = setTimeout(() => {
      this.execution.run();
    }, this.inputs.value('seconds')*1000);
  }
}