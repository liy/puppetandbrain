import Execution from './Execution'
import Input from '../data/Input';
import Output from '../data/Output';
import Node from './Node';

export default class Task extends Node
{
  constructor(id) {
    super(id);
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

  // chain(...taskInfoArr) {
  //   return taskInfoArr.reduce((result, current) => {
  //     // chain to default execution
  //     if(current.id) {
  //       result.execution.set('default', current);
  //       // current.parent = {
  //       //   name: 'default',
  //       //   task: result,
  //       // }
  //       current.parent = result;
  //       current.parentExecutionName = 'default'

  //       result.connectNext('default', current);

  //       return current
  //     }
  //     else {
  //       let currentTask = current.task;
  //       result.execution.set(current.name, currentTask);
  //       // currentTask.parent = {
  //       //   name: current.name,
  //       //   task: result,
  //       // };
  //       currentTask.parent = result;
  //       currentTask.parentExecutionName = current.name;
  //       return currentTask
  //     }
  //   }, this);
  // }

  connectNext(target, executionName='default') {
    // Remove existing connection information
    if(target.parent) {
      target.parent.execution.set(target.parentExecutionName, null);
    }
    let oldTarget = this.execution.get(executionName);
    if(oldTarget) {
      oldTarget.parent = null;
      oldTarget.parentExecutionName = null;
    }

    this.execution.set(executionName, target)
    target.parent = this;
    target.parentExecutionName = executionName;

    return target;
  }

  connectParent(parent, parentExecutionName) {
    parent.connectNext(this, parentExecutionName);
    return parent;
  }

  run() {
    console.log('run', this.nodeName, this.id);
  }

  pod() {
    return {
      ...super.pod(),
      id: this.id,
      parent: this.parent ? this.parent.id : null,
      parentExecutionName: this.parentExecutionName,
      execution: this.execution.pod(),
    }
  }
}