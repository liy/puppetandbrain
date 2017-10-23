import Task from './Task'

export default class EntryTask extends Task
{
  /**
   * 
   * @param {String} type Event type
   * @memberof EventTask
   */
  constructor(data) {
    super(data);

    this.type = data.type;
  }

  async run() {
    return this.execution.default.run();
  }

  pod() {
    return {
      ...super.pod(),
      type: this.type,
    }
  }
}