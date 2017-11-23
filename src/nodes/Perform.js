import Task from './Task'

export default class Perform extends Task
{
  /**
   *
   * @param {String} name Function name
   * @memberof Function
   */
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.target = LookUp.auto(pod.target);
    this.actionName = pod.actionName;

    // Get all the outputs of the target action, and presented as Call inputs
    // When task runs, all the Call input value will be assigned to Function's output
    for(let name of this.action.outputs.names) {
      this.inputs.addName(name);
    }
  }

  get action() {
    return this.target.actions[this.actionName];
  }

  run() {
    super.run()

    // Pass the input value to the action's outputs
    for(let name of this.inputs.names) {
      this.action.outputs.assignValue(name, this.inputs.value(name));
    }

    this.action.run();

    this.execution.run();
  }

  get nodeName() {
    return this.target.name + ' Perform '  + this.actionName;
  }

  pod(detail=false) {
    let pod = super.pod(detail);
    pod.target = this.target.id;
    pod.actionName = this.actionName;
    return pod;
  }
}