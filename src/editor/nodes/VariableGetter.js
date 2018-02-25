import Node from "./Node";

NodeTemplate.VariableGetter = {
  className: 'VariableGetter',
  name: 'Getter',
  enter: {
    name: 'default',
    enabled: false,
  },
  execution: [],
  inputs: [],
  outputs: [],
  elementClass: ['property', 'collapsed'],
  category: 'Property'
}

/**
 * Variable(brain property) getter
 */
export default class VariableGetter extends Node
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.variableID = pod.variableID;
    this.variable = this.lookUp.get(this.variableID);
    this.variable.getters.push(this)

    // Note that I hardcode the output id to be "output",
    // it can be called 'whatever', as long as it is unique in the getter scope.
    // Originally it is set to variable ID. But the problem is that varaible id
    // can change when importing actor. This causes unnecessary complexity.
    // Therefore I decide just hard code output id to be "output".
    // of course, the setter input and output use same rule.
    // GetterBlock will display proper text uses variable name
    this.outputs.assignProperty('output', {
      get: () => {
        return this.variable.runtime;
      }
    }, this.variable.descriptor);
  }

  destroy() {
    super.destroy();
    // de-register from variable
    let index = this.variable.getters.indexOf(this)
    if(index != -1) this.variable.getters.splice(index, 1)
  }

  get variableName() {
    return this.variable.name;
  }

  get nodeName() {
    return `${this.variableName}`;
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.variableID = this.variableID;
    // TODO: not sure this is useful or not.
    pod.variableName = this.variableName;
    return pod;
  }
}