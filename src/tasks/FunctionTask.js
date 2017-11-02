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

    this.properties = {
      name: null
    }
  }

  init(data) {
    super.init(data);

    let functionName = this.properties.name = data.name;
    this.actor.functions[functionName] = this;
  }

  rename(name) {
    // validate there are no same function names
    if(this.actor.functions[name]) return false;

    delete this.actor.functions[this.inputs.get('name')];
    this.properties.name = name;
    return true
  }

  async run(inputs) {
    return this.execution.default.run();
  }
}