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

    this.params = data.params;
  }

  async run() {
    console.log('run', this.params)
    return this.execution.default.run(this.params);
  }

  pod() {
    return {
      ...super.pod(),
      name: this.name,
    }
  }
}