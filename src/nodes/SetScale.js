import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetScale = {
  ...ParentTemplate,
  className: 'SetScale',
  name: 'Set Scale',
  inputs: [{
    name: 'scale',
    type: DataType.VEC2,
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

  run() {
    super.run();

    let s = this.inputs.value('scale');
    this.owner.scale.x = Number(s.x);
    this.owner.scale.y = Number(s.y);
  }
}
