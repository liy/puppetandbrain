export default class OutputGetter 
{
  constructor(inputNode, inputName, outputNode, outputName, id) {
    this.id = LookUp.addGetter(this, id);
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