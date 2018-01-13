import {Task, Template as ParentTemplate} from './Task'
import DataType from '../data/DataType';

NodeTemplate.Branch = {
  ...ParentTemplate,
  execution: [{
    name: 'true'
  }, {
    name: 'false'
  }],
  inputs: [{
    name: 'condition',
    type: DataType.GENERIC,
  }],
  memory: {
    condition: true
  },
  elementClass: ['flow-control'],
  category: 'Flow Control',
  keywords: ['if else']
}

export default class Branch extends Task
{
  constructor(id) {
    super(id);
  }

  run() {
    super.run();
    
    let condition = this.inputs.value('condition');
    if(condition === 'true' || condition === true ) {
      this.execution.run('true')
    }
    else {
      this.execution.run('false');
    }
  }
}