import EventEmitter from '../utils/EventEmitter'
import Execution from './Execution'
import {DataArray} from '../Data';

export default class Task extends EventEmitter
{
  constructor(actor, id) {
    super();

    this.id = TaskLookUp.create(this, id);
    this.actor = actor;
    this.execution = new Execution();

    this.inputs = new DataArray('input');
    this.outputs = new DataArray('output');
  }


  chain(...tasks) {
    return tasks.reduce((result, current) => {
      result.execution.default = current;
      current.parent = result;
      return current
    }, this);
  }

  async run() {
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
      execution: this.execution.pod(),
      actor: this.actor.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod()
    }
  }
}