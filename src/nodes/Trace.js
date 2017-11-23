import Task from './Task'

export default class Trace extends Task
{
  constructor(id) {
    super(id);

    this.inputs.addInput('text')
  }

  get nodeName() {
    return 'Print';
  }

  run() {
    super.run()
    // TODO: print on the actual editor console
    console.log('%c%s', 'color: green', this.inputs.value('text'));

    this.execution.run()
  }
}