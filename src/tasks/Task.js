import EventEmitter from '../utils/EventEmitter'
import Execution from './Execution'
import {InputList, OutputList} from '../Data';

export default class Task extends EventEmitter
{
  constructor() {
    super();
    this.execution = new Execution();
    
    this.inputs = new InputList();
    this.outputs = new OutputList();

    this.properties = Object.create(null);
  }

  init(actor, properties, id) {
    this.id = LookUp.addTask(this);
    this.actor = data.actor;
  }

  fill(pod) {
    this.id = LookUp.addTask(this, pod.id)
    this.actor = LookUp.get(pod.actor);

    // TODO: fill properties and inputs

    pod.inputs.forEach(input => {
      this.inputs.add(input.name, LookUp.get(input.data))
    })

    pod.outputs.forEach(output => {
      this.outputs.add(output.name, LookUp.get(output.data))
    })
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
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(),
    }
  }
}