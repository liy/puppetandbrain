import EventEmitter from '../utils/EventEmitter'
import Execution from './Execution'
import Input from '../data/Input';
import Output from '../data/Ouput';

export default class Task extends EventEmitter
{
  constructor() {
    super();
    
    this.execution = new Execution();

    this.variables = Object.create(null);

    this.inputs = new Input(this);
    this.outputs = new Output(this);
  }

  destroy() {
    LookUp.removeTask(this.id);
  }

  init(data) {
    this.id = LookUp.addTask(this, data.id)
    this.actor = data.actor;
  }

  fill(pod) {
    this.id = LookUp.addTask(this, pod.id)
    this.actor = LookUp.get(pod.actor);
    Object.assign(this.variables, pod.variables);

    // we just need the name to be populated here.
    // variable access will be auto created. 
    // Of course some of them will be discarded once 
    // pointer is added
    for(let inputData of pod.inputs) {
      this.inputs.add(inputData.name);
    }

    // Only need the name. Ouput is dynamically generated!
    for(let name of pod.outputs) {
      this.outputs.add(name);
    }
  }

  chain(...taskInfoArr) {
    return taskInfoArr.reduce((result, current) => {
      // chain to default execution
      if(current.id) {
        result.execution.set('default', current);
        current.parent = result;
        return current
      }
      else {
        let currentTask = current.task;
        result.execution.set(current.name, currentTask);
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
      variables: this.variables,
      execution: this.execution.pod(),
      actor: this.actor.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(),
    }
  }
}