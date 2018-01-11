import {Task, Template as TaskTemplate} from './Task'

NodeTemplate.Branch = {
  ...TaskTemplate,
  name: 'Branch',
  out: ['true', 'false'],
  input: [{
    name: 'condition',
    type: 'boolean',
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