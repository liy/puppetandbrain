import EventEmitter from '../utils/EventEmitter'
import Execution from './Execution'

export default class Task extends EventEmitter
{
  constructor(data) {
    super();

    this.id = TaskLookUp.create(this, data.id);

    this.execution = new Execution();
  }

  async run() {
    await this.process();
    this.emit('task.complete')
    return this.execution.default ? this.execution.default.run() : Promise.resolve();
  }

  chain(...tasks) {
    return tasks.reduce((result, current) => {
      result.execution.default = current;
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
      execution: this.execution.pod()
    }
  }
}