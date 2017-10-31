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
    let functionName = this.inputs.create('name', data.name).value;
    this.actor.functions[functionName] = this;
  }

  fill(pod) {
    super.fill(pod);
    let functionName = this.inputs.value('name');
    this.actor.functions[functionName] = this;
  }

  rename(name) {
    // validate there are no same function names
    if(this.actor.functions[name]) return false;

    delete this.actor.functions[this.inputs.get('name')];
    this.inputs.set('name', name);
    return true
  }

  async run(inputs) {
    return this.execution.default.run();
  }
}