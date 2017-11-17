import Task from './Task'

export default class Function extends Task
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

    // authoring time thing!
    this.functionName = pod.functionName;

    this.actor.functions[this.functionName] = this;
  }

  rename(name) {
    // validate there are no same function names
    if(this.actor.functions[name]) return false;

    delete this.actor.functions[this.functionName];
    this.functionName = name;
    return true
  }

  run() {
    super.run()

    this.execution.run();
  }

  pod() {
    let pod = super.pod();
    pod.functionName = this.functionName;
    return pod
  }
}