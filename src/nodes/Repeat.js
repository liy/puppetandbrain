import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Repeat = {
  ...ParentTemplate,
  className: 'Repeat',
  name: 'Repeat',
  execution: [{
    name: 'repeat'
  }, {
    name: 'exit'
  }],
  inputs: [{
    name: 'count',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  outputs: [{
    name: 'index',
    descriptor: {
      type: DataType.GENERIC,
    }
  }],
  memory: {
    count: 3
  },
  elementClass: ['flow-control'],
  category: 'Flow Control',
  keywords: ['loop', 'repeat']
}

export default class Repeat extends Task
{
  constructor(id) {
    super(id);
  }

  run() {
    super.run()
    for(let i=0; i<this.inputs.value('count'); ++i) {
      this.outputs.assignValue('index', this.index);
      this.execution.run('body')
    }
    this.execution.run('completed')
  }
}