import {Task, Template as TaskTemplate} from './Task'
import DataType from '../data/DataType';

export const Template = NodeTemplate.Animation = {
  ...TaskTemplate,
  input: [{
    name: 'name',
    type: DataType.GENERIC
  }],
  output: [],
}

export default class Animation extends Task
{
  constructor(id) {
    super(id);

    console.log(this.nodeName)
  }

  run() {
    super.run()

    this.owner.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }
}