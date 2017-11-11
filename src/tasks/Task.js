import EventEmitter from '../utils/EventEmitter'
import Execution from './Execution'
import { DataList } from '../Data';

export default class Task extends EventEmitter
{
  constructor() {
    super();
    this.execution = new Execution();

    this.inputs = new DataList();
    this.outputs = new DataList();
  }

  init(data) {
    this.id = LookUp.addTask(this, data.id)
    this.actor = Number.isInteger(data.actor) ? LookUp.get(data.actor) : data.actor;
  }

  chain(...tasks) {
    return tasks.reduce((result, current) => {
      result.execution.default = current;
      current.parent = result;
      return current
    }, this);
  }

  async run() {
    console.log('run', this)
    await this.process();
    this.emit('task.complete') 
    return this.execution.default ? this.execution.default.run() : Promise.resolve();
  }

  process() {
    return Promise.resolve();
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      execution: this.execution.pod(),
      actor: this.actor.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(),
    }
  }
}