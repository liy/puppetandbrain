import Task from './Task'

export default class FunctionTask extends Task
{
  /**
   * 
   * @param {String} name Function name
   * @memberof FunctionTask
   */
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    // This is a authoring time static data, needs to be provided when creating activity.
    this.name = data.name;
    this.actor.functions[this.name] = this;
  }

  rename(name) {
    // validate there are no same function names
    if(this.actor.functions[name]) return false;

    delete this.actor.functions[this.name];
    this.name = name;
    return true
  }

  async run(inputs) {
    return this.execution.default.run();
  }
}