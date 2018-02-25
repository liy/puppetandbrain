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
      gadgetClassName: 'DropDown'
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
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    try {
      this.list = this.owner.getAnimations().map(animation => animation.name);
    }
    catch(err) {
      console.warn('This is not a spine actor, no animations')
      this.list = [];
    }
  }

  run() {
    super.run()

    try {
      this.owner.setAnimation(this.inputs.value('name'));
    }
    catch(err) {
      console.warn('This is not a spine actor, cannot play animtion')
    }

    this.execution.run();
  }

  getGadgetConstructorData(inputName) {
    return {
      list: this.list,
      value: this.memory[inputName]
    }
  }
}