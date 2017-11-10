import EventEmitter from '../utils/EventEmitter'
import Execution from './Execution'
import {AccessorList, OutputList} from '../Data';

export default class Task extends EventEmitter
{
  constructor() {
    super();
    this.execution = new Execution();

    this.variables = Object.create(null);

    this.accessors = new AccessorList();
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
      variables: this.variables,
      accessors: this.accessors.pod(),
    }
  }
}