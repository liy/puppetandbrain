import utils from '../utils/utils';
import {Task, Template as TaskTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetRotation = {
  ...TaskTemplate,
  name: 'Set Rotation',
  input: [{
    name: 'rotation',
    type: DataType.GENERIC,
  }],
  elementClass: ['property']
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
