import Execution from '../edge/Execution'
import Enter from '../edge/Enter'
import Node from './Node';
import ArrayMap from '../utils/ArrayMap';

export const Template = {
  enter: {
    name: 'default',
    enabled: true,
  },
  execution: [{
    name: 'default'
  }],
  inputs: [],
  outputs: [],
  elementClass: [],
}

export class Task extends Node
{
  constructor(id) {
    super(id);

    this.enter = new Enter();
    this.execution = new Execution();
  }

  init(pod) {
    super.init(pod);

    // in
    this.enter.name = pod.enter.name;
    this.enter.enabled = pod.enter.enabled;

    // out
    if(pod.execution) {
      for(let execution of NodeTemplate[this.className].execution) {
        this.execution.set(execution.name)
      }
    }

    this.setInitialState();
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

  getCallers() {
    return this.enter.getCallers();
  }

  connectNext(target, executionName='default') {
    // Remove old target connection information
    let oldTask = this.execution.get(executionName);
    if(oldTask) this.disconnectNext(oldTask, executionName);

    // link execution name with the target
    this.execution.connect(executionName, target)
    // link target enter with this node
    target.enter.connect(this, executionName)

    return target;
  }

  connectParent(parent, parentExecutionName) {
    parent.connectNext(this, parentExecutionName);
    return parent;
  }

  disconnectNext(target, executionName='default') {
    // disconnect target enter with this node execution name
    target.enter.disconnect(this, executionName);
    // disconnect this execution name
    this.execution.disconnect(executionName);
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
      enter: this.enter.pod()
    }
  }
}