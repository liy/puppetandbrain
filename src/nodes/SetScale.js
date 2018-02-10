import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetScale = {
  ...ParentTemplate,
  className: 'SetScale',
  name: 'Set Scale',
  inputs: [{
    name: 'scale',
    descriptor: {
      type: DataType.VEC2,
    }
  }],
  outputs: [{
    name: 'scale',
    descriptor: {
      type: DataType.VEC2,
    }
  }],
  memory: {
    scale: {x:1, y:1}
  },
  elementClass: ['property'],
  category: 'Transformation'
}

export default class SetScale extends Task
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    console.log(pod)

    this.outputs.assignProperty('scale', {
      get: () => {
        return this.owner.scale
      }
    });
  }

  run() {
    super.run();

    let s = this.inputs.value('scale');
    this.owner.scale.x = Number(s.x);
    this.owner.scale.y = Number(s.y);
    this.execution.run();
  }
}
