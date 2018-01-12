import {Task, Template as TaskTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.SetPosition = {
  ...TaskTemplate,
  name: 'Set Position',
  input: [{
    name: 'x',
    type: DataType.GENERIC,
  }, {
    name: 'y',
    type: DataType.GENERIC,
  }]
}

export default class SetPosition extends Task
{
  constructor(id) {
    super(id)
  }

  init(pod) {
    super.init(pod);

    this.variables.x = pod.variables.x || this.owner.x
    this.variables.y = pod.variables.y || this.owner.y
  }

  run() {
    super.run();

    this.owner.x = Number(this.inputs.value('x'));
    this.owner.y = Number(this.inputs.value('y'));
  }

  get nodeName() {
    return 'Set Position';
  }

  get elementClassName() {
    return ['property'];
  }
}
