import Execution from './Execution'
import Node from './Node';
import ArrayMap from '../utils/ArrayMap';

export const NodeTemplate = {
  in: ['default'],
  out: ['default'],
  input: [],
  output: [],
}

export class Task extends Node
{
  constructor(id) {
    super(id);

    this.in = [];
    this.execution = new Execution(this);
    this.callers = new ArrayMap();
  }

  init(pod) {
    super.init(pod);

    this.setInitialState();
  }

  mold() {
    super.mold();

    if(NodeTemplate[this.className]) {
      // in
      if(NodeTemplate[this.className].in) {
        this.in = NodeTemplate[this.className].in.concat();
      }

      // out
      if(NodeTemplate[this.className].out) {
        for(let name of NodeTemplate[this.className].out) {
          this.execution.set(name)
        }
      }
    }
  }

  get hasIn() {
    return this.in.length != 0;
  }

  setInitialState() {
    this.initialState = {
      variables: JSON.parse(JSON.stringify(this.variables))
    }
  }

  terminate() {
    super.terminate();
    this.variables = this.initialState.variables;
  }

  connectNext(target, executionName='default') {
    // Remove old target connection information
    let oldTarget = this.execution.get(executionName);
    if(oldTarget) this.disconnectNext(oldTarget, executionName);

    // setup new connection to target
    this.execution.set(executionName, target)

    // Make the target knows that it is connected by this task
    // 
    // Note that caller's key is combination of
    // the caller's id and its execution name.
    // this because same caller can have multiple
    // executions connected to this task. Caller's
    // id cannot identify the actual execution information.
    // Combine both id and exeuction name can solve the issue
    target.callers.set(this.id+'.'+executionName, {
      executionName: executionName,
      task: this
    });

    return target;
  }

  connectParent(parent, parentExecutionName) {
    parent.connectNext(this, parentExecutionName);
    return parent;
  }

  disconnectNext(target, executionName='default') {
    // Note the combination of id and exeuciton name is used
    // for removing the caller information.
    target.callers.remove(this.id+'.'+executionName)
    this.execution.set(executionName, null);
  }

  disconnectParent(parent, parentExecutionName) {
    parent.disconnectNext(this, parentExecutionName);
  }

  run() {
    this.emit('task.start', this);
    // console.log('run', this.nodeName, this.id);
  }

  pod(detail=false) {
    return {
      ...super.pod(detail),
      id: this.id,
      execution: this.execution.pod(),
      // This is used when redo block deletion to connect parent nodes 
      callers: this.callers.getValues().map(caller => {
        return {
          executionName: caller.executionName,
          id: caller.task.id
        }
      })
    }
  }
}