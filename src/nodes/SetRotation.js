import Task from "./Task";
import utils from '../utils/utils';

export default class SetRotation extends Task
{
  constructor(id) {
    super(id)

    this.inputs.addInput('rotation')
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
}
