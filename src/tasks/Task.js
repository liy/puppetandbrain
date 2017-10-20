import EventEmitter from '../utils/EventEmitter'

var ID = 0;

export default class Task extends EventEmitter
{
  constructor() {
    super();

    this.id = ++ID;

    this.next = null;
  }

  async run() {
    await this.process();
    this.emit('task.complete')
    return this.next ? this.next.run() : Promise.resolve();
  }

  chain(...tasks) {
    return tasks.reduce((result, current) => {
      result.next = current;
      current.parent = result;
      return current
    }, this);
  }

  process() {
    return Promise.resolve();
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
    }
  }

  serialize() {
    return JSON.stringify(this.pod());
  }
}