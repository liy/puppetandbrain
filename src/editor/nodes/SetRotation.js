import {toRadian} from '@/utils/utils';
import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetRotation = {
  ...ParentTemplate,
  className: 'SetRotation',
  name: 'Set Rotation',
  inputs: [{
    name: 'rotation',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'rotation',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  memory: {
    rotation: 0
  },
  elementClass: ['property'],
  category: 'Transformation'
}

export default class SetRotation extends Task
{
  constructor(id, lookUp) {
    super(id, lookUp)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('rotation', {
      get: () => {
        return this.owner.rotation
      }
    });
  }

  run() {
    super.run();

    this.owner.rotation = Number(this.inputs.value('rotation')) * toRadian;
    this.execution.run();
  }
}
