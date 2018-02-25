import Node from "./Node";
/**
 * Base class of any node has variable operation
 */
export default class extends Node
{
  constructor(id, lookUp) {
    super(id, lookUp);
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
    this.operation = NodeTemplate[this.className].operations.find(operation => {
      return operation.operationName == operationName;
    });

    // change input type
    let types = this.operation.inputType;
    if(!types) {
      types = {};
      // default template types
      for(let input of NodeTemplate[this.className].inputs) {
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