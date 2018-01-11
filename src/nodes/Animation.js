import {Task, Template as TaskTemplate} from './Task'

export const Template = NodeTemplate.Animation = {
  ...TaskTemplate,
  name: 'Animation',
  input: [{
    name: 'name',
    type: 'string'
  }],
  output: [],
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