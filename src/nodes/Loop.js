import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Loop = {
  ...ParentTemplate,
  className: 'Loop',
  name: 'Loop',
  execution: [{
    name: 'loop'
  }, {
    name: 'exit'
  }],
  inputs: [{
    name: 'condition',
    type: DataType.GENERIC,
  }],
  outputs: [{
    name: 'count',
    type: DataType.GENERIC,
  }],
  memory: {
    condition: true,
  },
  elementClass: ['flow-control'],
  category: 'Flow Control',
}

export default class Loop extends Task
{
  constructor(id) {
    super(id);

    Editor.on('game.prestart', this.prestart, this);
  }

  destroy() {
    super.destroy();
    Editor.off('game.prestart', this.prestart, this);
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