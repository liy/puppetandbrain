export default class Pointer
{
  constructor(inputNode, inputName, outputNode, outputName, id) {
    this.inputNode = inputNode;
    this.inputName = inputName;
    this.outputNode = outputNode;
    this.outputName = outputName;

    this.isLocalPointer = !this.outputNode;

    // points to input node itself, its local variable
    if(this.isLocalPointer) {
      this.target = inputNode.variables;
      this.targetName = inputName;
      // Check below see why no id is genreated for local variable pointer
    }
    // points to another node's output, its output data
    else {
      this.target = outputNode.outputs.data;
      this.targetName = outputName;
      // Only output pointer will have id
      this.id = LookUp.addPointer(this, id);
    }
  }

  destroy() {
    if(this.id) LookUp.removePointer(id);
  }

  get value() {
    console.log(this.target)
    return this.target[this.targetName]
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      inputNode: this.inputNode.id,
      inputName: this.inputName,
      // only record the information below if pointer points to another node
      // undefined field will be removed when serailized
      id: this.id,
      outputNode: this.outputNode ? this.outputNode.id : undefined,
      outputName: this.outputName,
    }
  }
}