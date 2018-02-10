import Node from "./Node";
/**
 * Base class of any node has variable operation
 */
export default class extends Node
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.operationName = pod.operationName;

    this.outputs.assignProperty('value', {
      get: () => {
        return this[this.operation.operationName]();
      }
    });
  }

  set operationName(operationName) {
    this.operation = NodeTemplate[this.className].operations.find(operation => {
      return operation.operationName == operationName;
    });
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