import Execution from './Execution'
import Input from '../data/Input';
import Output from '../data/Output';
import Node from './Node';
import ArrayMap from '../utils/ArrayMap';

export default class Task extends Node
{
  constructor(id) {
    super(id);
    this.execution = new Execution();
    this.callers = new ArrayMap();
  }

  init(pod) {
    super.init(pod);

    this.setInitialState();
  }

  destroy() {
    super.destroy();
    LookUp.removeTask(this.id);
  }

  get hasIn() {
    return true;
  }

  setInitialState() {
    this.initialState = {
      variables: JSON.parse(JSON.stringify(this.variables))
    }
  }

  terminate() {
    this.variables = this.initialState.variables;
  }

  connectNext(target, executionName='default') {
    // Remove old target connection information
    let oldTarget = this.execution.get(executionName);
    if(oldTarget) {
      oldTarget.callers.remove(this.id)
    }

    this.execution.set(executionName, target)
    // target.parent = this;
    // target.parentExecutionName = executionName;

    target.callers.set(this.id, {
      executionName: executionName,
      task: this
    })

    return target;
  }

  connectParent(parent, parentExecutionName) {
    parent.connectNext(this, parentExecutionName);
    return parent;
  }

  disconnectNext(target, executionName='default') {
    target.callers.remove(this.id)
    this.execution.set(executionName, null)
  }

  disconnectParent(parent, parentExecutionName) {
    parent.disconnectNext(this, parentExecutionName);
  }

  run() {
    console.log('run', this.nodeName, this.id);
  }

  pod() {
    return {
      ...super.pod(),
      id: this.id,
      execution: this.execution.pod(),
      // TODO: remove this
      // caller information is not used in building the graph, just for debugging
      callers: this.callers.getValues().map(caller => {
        return {
          executionName: caller.executionName,
          task: caller.task.id
        }
      })
    }
  }
}