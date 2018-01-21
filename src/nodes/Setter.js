import {Task} from "./Task";

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

export default class Setter extends Task
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    // use variable id instead of name, as name will be changed by user
    this.variableID = pod.variableID;
    this.variable = LookUp.get(this.variableID);
    this.variable.setters.push(this)

    this.inputs.add(this.variableID, this.variable.type);

    this.outputs.add(this.variableID, this.variable.type);

    // Set default memory value from the brain property's value
    this.memory[this.variableID] = this.memory[this.variableID] || this.variable.data;
    
    // Note the output key is the variable id!!!
    this.outputs.assignProperty(this.variableID, {
      get: () => {
        return this.variable.runtime;
      }
    }, this.variable.type);
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

    this.variable.runtime = this.inputs.value(this.variableID);

    this.execution.run();
  }

  get nodeName() {
    return `Set ${this.variableName}`;
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.variableID = this.variableID;
    return pod;
  }
}