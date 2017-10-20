import EventEmitter from '../utils/EventEmitter'

export default class Task extends EventEmitter
{
  constructor() {
    super();

    this.parent = null;
    this.next = null;
    this.data = null;
  }

  async run() {
    await this.process();
    this.emit('task.complete')
    return this.next ? this.next.run() : Promise.resolve();
  }

  chain(...tasks) {
    return tasks.reduce((result, current) => {
      result.next = current;
      return current
    }, this);
  }

  process() {
    return Promise.resolve();
  }
}