import Task from './Task'

export default class Loop extends Task
{
  constructor(id) {
    super(id);

    // no default
    this.execution.remove('default');
    this.execution.set('completed');
    this.execution.set('body');

    this.inputs.addInput('limit');

    this.outputs.addOutput('index');
  }

  prestart() {
    this.index = 0;
  }

  run() {
    super.run()
    this.outputs.assignValue('index', this.index);
    if(++this.index > parseInt(this.inputs.value('limit'))) {
      this.execution.run('completed')
    }
    else {
      this.execution.run('body')
    }
  }
}