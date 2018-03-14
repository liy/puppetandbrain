import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.set({
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
    descriptor: {
      type: DataType.BOOLEAN,
    }
  }],
  outputs: [{
    name: 'count',
    descriptor: {
      type: DataType.INTEGER,
    }
  }],
  memory: {
    condition: true,
  },
  elementClass: ['flow-control'],
  category: 'Flow Control',
})

export default class Loop extends Task
{
  constructor(id, activity) {
    super(id, activity);

    this.activity.on('game.prestart', this.prestart, this);
  }

  destroy() {
    this.activity.off('game.prestart', this.prestart, this);
    super.destroy();
  }

  prestart() {
    this.count = 0;
  }

  run() {
    super.run()

    this.outputs.assignValue('count', ++this.count);
    if(this.inputs.value('condition')) {
      this.execution.run('loop')
    }
    else {
      this.execution.run('exit')
    }
  }
}