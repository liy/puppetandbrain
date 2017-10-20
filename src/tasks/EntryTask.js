import Task from './Task'

export default class EntryTask extends Task
{
  /**
   * 
   * @param {String} type Event type
   * @memberof EventTask
   */
  constructor(type) {
    super();

    this.type = type;
  }

  async run() {
    return this.next.run();
  }

  pod() {
    return {
      ...super.pod(),
      type: this.type,
    }
  }
}