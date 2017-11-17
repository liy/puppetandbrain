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

    this.callee = LookUp.auto(pod.callee);
    this.actionName = pod.actionName;

    // Get all the ouputs of the target action, and presented as Call inputs
    // When task runs, all the Call input value will be assigned to Function's output
    for(let name of this.action.outputs.names) {
      this.inputs.add(name);
    }

    // TODO: think about returns. It is not the same as ouput of a node.
    // returns is a action specific thing.
  }

  get action() {
    return this.callee.actions[this.actionName];
  }

  run() {
    super.run()

    // Pass the input value to the action's outputs
    for(let name of this.inputs.list) {
      this.action.outputs.data[name] = this.inputs.value(name);
    }

    this.action.run();

    this.execution.run();
  }

  pod() {
    let pod = super.pod();
    pod.callee = this.callee.id;
    pod.actionName = this.actionName;
    return pod;
  }
}