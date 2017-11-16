/**
 * Point(input of current node) to a ouput of node 
 * 
 * @export
 * @class Pointer
 */
export default class Pointer
{
  constructor(inputNode, inputName, outputNode, outputName, id) {
    this.id = LookUp.addPointer(this, id);
    this.inputNode = inputNode;
    this.inputName = inputName;
    this.outputNode = outputNode;
    this.outputName = outputName;
  }

  get value() {
    return this.outputNode.outputs[this.outputName]
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      inputNode: this.inputNode.id,
      inputName: this.inputName,
      outputNode: this.outputNode.id,
      outputName: this.outputName,
    }
  }
}