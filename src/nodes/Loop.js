import Task from './Task'

export default class Loop extends Task
{
  constructor(id) {
    super(id);

    Stage.on('game.prestart', this.prestart, this);

    // no default
    this.execution.remove('default');
    this.execution.set('completed');
    this.execution.set('body');

    this.variables.condition = true;
    this.inputs.addInput('condition');

    this.outputs.addOutput('times');
  }

  destroy() {
    super.destroy();
    Stage.off('game.prestart', this.prestart, this);
  }

  prestart() {
    this.times = 0;
  }

  run() {
    super.run()

    this.outputs.assignValue('times', ++this.times);
    if(this.inputs.value('condition')) {
      this.execution.run('body')
    }
    else {
      this.execution.run('completed')
    }
  }
}