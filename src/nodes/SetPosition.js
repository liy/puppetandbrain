import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetPosition = {
  ...ParentTemplate,
  name: 'Set Position',
  inputs: [{
    name: 'position',
    type: DataType.VEC2,
  }],
  memory: {
    position: {x:0, y:0}
  },
  elementClass: ['property'],
  category: 'Transformation'
}

export default class SetPosition extends Task
{
  constructor(id) {
    super(id)
  }

  run() {
    super.run();

    let p = this.inputs.value('position');
    this.owner.x = Number(p.x);
    this.owner.y = Number(p.y);
  }
}
