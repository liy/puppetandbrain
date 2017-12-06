import Task from "./Task";

export default class SetPosition extends Task
{
  constructor(id) {
    super(id)

    this.inputs.addInput('x')
    this.inputs.addInput('y')
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
}
