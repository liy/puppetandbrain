import {Task} from "./Task";
import DataType from "../data/DataType";

NodeTemplate.Setter = {
  className: 'Setter',
  enter: {
    name: 'default',
    enabled: true,
  },
  execution: [{
    name: 'default'
  }],
  inputs: [],
  outputs: [],
  elementClass: ['property', 'setter'],
  category: 'Property'
}

/**
 * Variable Setter!!!!!!!!! Not other setter, variable, the variable used by brain, you added into
 * the side panel
 */
export default class Setter extends Task
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.variableID = pod.variableID;
    this.variable = LookUp.get(this.variableID);
    this.variable.setters.push(this)

    // Note that I uses "input" for input id.
    // Originally it is set to be variableID but it can change when importing actor causing unnecessary complexity
    // SetterBlock will change the label using actual variable name.
    //
    // TODO: assign variable's descriptor
    this.inputs.add('input', {type:this.variable.type});
    this.memory['input'] = this.memory['input'] || this.variable.data;
    // same rule as the input...
    this.outputs.assignProperty('output', {
      get: () => {
        return this.variable.runtime;
      }
    }, this.variable.descriptor);
  }
  
  destroy() {
    super.destroy();
    // de-register from variable
    let index = this.variable.setters.indexOf(this)
    if(index != -1) this.variable.setters.splice(index, 1)
  }

  get variableName() {
    return this.variable.name;
  }

  run() {
    super.run();

    this.variable.runtime = this.inputs.value('input');

    this.execution.run();
  }

  get nodeName() {
    return `Set ${this.variableName}`;
  }

  getUserFiles() {
    // TODO handle image type
    if(this.variable.type == DataType.AUDIO || this.variable.type == DataType.IMAGE) {
      let data = this.memory['input']
      if(data) {
        return [data]
      }
    }
    return [];
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.variableID = this.variableID;
    return pod;
  }
}