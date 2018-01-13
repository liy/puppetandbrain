import {Task, Template as ParentTemplate} from './Task'
import DataType from '../data/DataType';

NodeTemplate.Animation = {
  ...ParentTemplate,
  inputs: [{
    name: 'name',
    type: DataType.GENERIC
  }],
  outputs: [],
  memory: {
    name: 'idle'
  }
}

export default class Animation extends Task
{
  constructor(id) {
    super(id);
  }

  run() {
    super.run()

    this.owner.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }
}