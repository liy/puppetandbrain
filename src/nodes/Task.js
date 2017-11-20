import Execution from './Execution'
import Input from '../data/Input';
import Output from '../data/Output';
import Node from './Node';

export default class Task extends Node
{
  constructor(id) {
    super();
    this.execution = new Execution();
  }

  init(pod) {
    super.init(pod);

    this.setInitialState();
  }

  destroy() {
    super.destroy();
    LookUp.removeTask(this.id);
  }

  setInitialState() {
    this.initialState = {
      variables: JSON.parse(JSON.stringify(this.variables))
    }
  }

  reset() {
    this.variables = this.initialState.variables;
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
    console.log('run', this.nodeName, this.id);
  }

  pod() {

    return {
      ...super.pod(),
      id: this.id,
      execution: this.execution.pod(),
    }
  }
}