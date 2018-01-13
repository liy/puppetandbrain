import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Loop = {
  ...ParentTemplate,
  executions: [{
    name: 'completed'
  }, {
    name: 'body'
  }],
  input: [{
    name: 'condition',
    type: DataType.GENERIC,
  }],
  output: [{
    name: 'count',
    type: DataType.GENERIC,
  }],
  memory: {
    condition: true,
  }
}

export default class Loop extends Task
{
  constructor(id) {
    super(id);

    Stage.on('game.prestart', this.prestart, this);
  }

  destroy() {
    super.destroy();
    Stage.off('game.prestart', this.prestart, this);
  }

  prestart() {
    this.count = 0;
  }

  run() {
    super.run()

    this.outputs.assignValue('count', ++this.count);
    if(this.inputs.value('condition')) {
      this.execution.run('body')
    }
    else {
      this.execution.run('completed')
    }
  }
}