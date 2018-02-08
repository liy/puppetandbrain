import {Task, Template as ParentTemplate} from './Task'
import DataType from '../data/DataType';

NodeTemplate.Animation = {
  ...ParentTemplate,
  className: 'Animation',
  name: 'Animation',
  inputs: [{
    name: 'name',
    descriptor: {
      type: DataType.STRING,
    }
  }],
  outputs: [],
  memory: {
    name: 'idle'
  },
  category: 'Animation',
  keywords: [...ParentTemplate.keywords, 'animate']
}

export default class Animation extends Task
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.list = this.owner.getAnimations().map(animation => animation.name);
  }

  run() {
    super.run()

    this.owner.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }
}