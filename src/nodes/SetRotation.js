import utils from '../utils/utils';
import {Task, Template as TaskTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetRotation = {
  ...TaskTemplate,
  name: 'Set Rotation',
  input: [{
    name: 'rotation',
    type: DataType.GENERIC,
  }]
}

export default class SetRotation extends Task
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);
  }

  run() {
    super.run();

    this.owner.rotation = Number(this.inputs.value('rotation')) * utils.toRadian;
  }

  get nodeName() {
    return 'Set Rotation';
  }

  get elementClassName() {
    return ['property'];
  }
}
