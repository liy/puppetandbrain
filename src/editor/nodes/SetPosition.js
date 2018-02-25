import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetPosition = {
  ...ParentTemplate,
  className: 'SetPosition',
  name: 'Set Position',
  inputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2,
      gadgetClassName: 'PositionField'
    }
  }],
  outputs: [{
    name: 'position',
    descriptor: {
      type: DataType.VEC2,
    }
  }],
  memory: {
    position: {x:0, y:0}
  },
  elementClass: ['property'],
  category: 'Transformation'
}

export default class SetPosition extends Task
{
  constructor(id, lookUp) {
    super(id, lookUp)
  }

  init(pod) {
    super.init(pod);

    this.outputs.assignProperty('position', {
      get: () => {
        return this.owner.position
      }
    });
  }

  run() {
    super.run();

    let p = this.inputs.value('position');
    this.owner.x = Number(p.x);
    this.owner.y = Number(p.y);
    this.execution.run();
  }
}
