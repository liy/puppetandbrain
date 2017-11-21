import Task from './Task'

export default class Loop extends Task
{
  constructor(id) {
    super(id);

    // no default
    this.execution.remove('default');
    this.execution.set('body');
    this.execution.set('completed');

    this.inputs.addName('times');
    this.outputs.addName('index');
  }

  run() {
    super.run()

    for(let i=0; i<this.inputs.value('times'); ++i) {
      this.outputs.assignValue('index', i);
      this.execution.run('body')
    }
    this.execution.run('completed')
  }
}