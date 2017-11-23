import Task from './Task'

export default class Repeat extends Task
{
  constructor(id) {
    super(id);

    // no default
    this.execution.remove('default');
    this.execution.set('completed');
    this.execution.set('body');
  }

  run() {
    super.run()
    for(let i=0; i<this.inputs.value('times'); ++i) {
      this.outputs.assignValue('index', this.index);
      this.execution.run('body')
    }
    this.execution.run('completed')
  }
}