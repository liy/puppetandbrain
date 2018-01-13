import utils from '../utils/utils';
import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetRotation = {
  ...ParentTemplate,
  name: 'Set Rotation',
  inputs: [{
    name: 'rotation',
    type: DataType.GENERIC,
  }],
  memory: {
    rotation: 0
  },
  elementClass: ['property'],
  category: 'Transformation'
}

export default class SetRotation extends Task
{
  constructor(id) {
    super(id)
  }

  run() {
    super.run();

    this.owner.rotation = Number(this.inputs.value('rotation')) * utils.toRadian;
  }
}
