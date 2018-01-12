import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Repeat = {
  ...ParentTemplate,
  execution: [{
    executionName: 'completed'
  }, {
    executionName: 'body'
  }],
  inputs: [{
    inputName: 'count',
    type: DataType.GENERIC,
  }],
  output: [{
    name: 'index',
    type: DataType.GENERIC,
  }]
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