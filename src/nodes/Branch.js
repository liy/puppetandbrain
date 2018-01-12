import {Task, Template as ParentTemplate} from './Task'
import DataType from '../data/DataType';

NodeTemplate.Branch = {
  ...ParentTemplate,
  execution: [{
    executionName: 'true'
  }, {
    executionName: 'false'
  }],
  inputs: [{
    inputName: 'condition',
    type: DataType.GENERIC,
  }]
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