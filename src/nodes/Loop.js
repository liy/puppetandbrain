import Task from './Task'

export default class Loop extends Task
{
  constructor(id) {
    super(id);

    // no default
    this.execution.remove('default');
    this.execution.set('body');
    this.execution.set('completed');

    this.inputs.addName('limit');
    this.outputs.addName('index');
  }

  prestart() {
    this.index = 0;
  }

  run() {
    super.run()
    this.outputs.assignValue('index', this.index);
    if(++this.index > this.inputs.value('limit')) {
      this.execution.run('completed')
    }
    else {
      this.execution.run('body')
    }
  }
}