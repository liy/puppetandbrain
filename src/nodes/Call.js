import Task from './Task'

export default class Call extends Task
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
    this.functionName = pod.functionName;

    // Get all the ouputs of the target function, and presented as Call inputs
    // When task runs, all the Call input value will be assigned to Function's output
    for(let name of this.function.outputs.names) {
      this.inputs.add(name);
    }

    // TODO: think about returns. It is not the same as ouput of a node.
    // returns is a function specific thing.
  }

  get function() {
    return this.callee.functions[this.functionName];
  }

  run() {
    super.run()

    // Pass the input value to the function's outputs
    for(let name of this.inputs.list) {
      this.function.outputs.data[name] = this.inputs.value(name);
    }

    this.function.run();

    this.execution.run();
  }

  pod() {
    let pod = super.pod();
    pod.callee = this.callee.id;
    pod.functionName = this.functionName;
    return pod;
  }
}