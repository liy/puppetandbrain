import Task from './Task'

export default class FunctionTask extends Task
{
  /**
   * 
   * @param {String} name Function name
   * @memberof FunctionTask
   */
  constructor(data) {
    super(data);
  }

  async run() {
    return this.execution.default.run();
  }

  pod() {
    return {
      ...super.pod(),
      name: this.name,
    }
  }
}