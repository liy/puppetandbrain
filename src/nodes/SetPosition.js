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
  elementClass: ['property']
}

export default class SetPosition extends Task
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.memory.x = pod.memory.x || this.owner.x
    this.memory.y = pod.memory.y || this.owner.y
  }

  run() {
    super.run();

    this.owner.x = Number(this.inputs.value('x'));
    this.owner.y = Number(this.inputs.value('y'));
  }
}
