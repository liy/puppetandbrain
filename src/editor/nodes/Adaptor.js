import Node from "./Node";
/**
 * Base class of any node has variable operation
 */
export default class extends Node
{
  constructor(id, activity) {
    super(id, activity);
  }

  init(pod) {
    super.init(pod);

    this.operationName = pod.operationName;

    this.outputs.assignProperty(pod.outputs[0].name, {
      get: () => {
        return this[this.operation.operationName]();
      }
    });
  }

  set operationName(operationName) {
    this.operation = NodeTemplate.get(this.className).operations.find(operation => {
      return operation.operationName == operationName;
    });

    // make it more robust, if we ever changed operation name,
    // it won't break all the users' creations
    this.operation = this.operation || NodeTemplate.get(this.className).operations[0];

    // change input type
    let types = this.operation.inputType;
    if(!types) {
      types = {};
      // default template types
      for(let input of NodeTemplate.get(this.className).inputs) {
        types[input.name] = input.descriptor.type;
      }
    }
    for(let input of this.inputs) {
      input.type = types[input.name];
    }

    this._operationName = operationName;
  }
 
  get operationName() {
    return this._operationName;
  }

  pod(detail) {
    return {
      ...super.pod(detail),
      operationName: this.operationName
    }
  }
}