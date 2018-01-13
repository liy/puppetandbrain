import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetPosition = {
  ...ParentTemplate,
  name: 'Set Position',
  inputs: [{
    name: 'x',
    type: DataType.GENERIC,
  }, {
    name: 'y',
    type: DataType.GENERIC,
  }],
  memory: {
    x: 0,
    y: 0,
  },
  elementClass: ['property'],
}

export default class SetPosition extends Task
{
  constructor(id) {
    super(id)
  }

  run() {
    super.run();

    this.owner.x = Number(this.inputs.value('x'));
    this.owner.y = Number(this.inputs.value('y'));
  }
}
