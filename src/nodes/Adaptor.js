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

    this.operationName = pod.name;

    this.outputs.assignProperty('value', {
      get: () => {
        return this[this.operation.operationName]();
      }
    });
  }

  set operationName(name) {
    this.operation = NodeTemplate[this.className].operations.find(operation => {
      console.log(operation.name, name)
      return operation.name == name;
    });
    this._operationName = name;
  }
 
  get operationName() {
    return this._operationName;
  }
}