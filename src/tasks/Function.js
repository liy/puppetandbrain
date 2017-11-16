import Task from './Task'

export default class Function extends Task
{
  /**
   * 
   * @param {String} name Function name
   * @memberof Function
   */
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    // This is a authoring time static data, needs to be provided when creating activity.
    this.variables.functionName = data.functionName;
    this.actor.functions[this.variables.functionName] = this;
  }

  fill(pod) {
    super.fill(pod);
    this.actor.functions[this.variables.functionName] = this;
  }

  rename(name) {
    // validate there are no same function names
    if(this.actor.functions[name]) return false;

    delete this.actor.functions[this.variables.functionName];
    this.variables.functionName = name;
    return true
  }

  run() {
    super.run()

    this.execution.run();
  }
}