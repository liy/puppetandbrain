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

  chain(...taskInfoArr) {
    return taskInfoArr.reduce((result, current) => {
      // result.execution.default = current;
      // current.parent = result;

      // chain to default execution
      if(Number.isInteger(current.id)) {
        result.execution.set('default', current);
        current.parent = result;
        return current
      }
      else {
        let currentTask = current.task;
        result.execution.set(current.executionName, currentTask);
        currentTask.parent = result;
        return currentTask
      }
    }, this);
  }

  run() {
    console.log('run', this.__proto__.constructor.name, this.id);
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