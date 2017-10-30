import Task from './Task'

export default class FunctionTask extends Task
{
  /**
   * 
   * @param {String} name Function name
   * @memberof FunctionTask
   */
  constructor(name, actor, id) {
    super(actor, id);

    let functionName = this.inputs.create('name').value = name;
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