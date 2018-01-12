import Node from "./Node";

// Variable getters are dynamic has no template

/**
 * Variable(brain property) getter
 */
export default class Getter extends Node
{
  constructor(id) {
    super(id);

    this.targetBrain = null;
  }

  init(pod) {
    super.init(pod);

    this.targetBrain = LookUp.auto(pod.targetBrain);
    // use variable id instead of name, as name will be changed by user
    this.variableID = pod.variableID;
    this.variable = LookUp.get(this.variableID);
    this.variable.getters.push(this)

    // Note the output key is the variable id!!!
    this.outputs.addOutput(this.variableID).assignProperty(this.variableID, {
      get: () => {
        return this.variable.runtime;
      }
    });
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
    return `Get ${this.owner.name} ${this.variableName}`;
  }

  get elementClass() {
    return ['property', 'getter'];
  }

  pod(detail) {
    let pod = super.pod(detail);
    pod.targetBrain = this.targetBrain.id;
    pod.variableID = this.variableID;
    // TODO: not sure this is useful or not.
    pod.variableName = this.variableName;
    return pod;
  }
}