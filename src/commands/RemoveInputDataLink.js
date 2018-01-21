import Command from './Command';

export default class RemoveInputDataLink extends Command
{
  constructor(inputNodeID, inputName) {
    super();

    this.inputNodeID = inputNodeID;
    this.inputName = inputName;
    let pointer = this.inputNode.inputs.get(this.inputName);
    if(pointer.output) {
      this.outputNodeID = pointer.output.node.id;
      this.outputName = pointer.output.name;
    }
  }

  get inputNode() {
    return LookUp.get(this.inputNodeID)
  }

  process() {
    let pointer = this.inputNode.inputs.get(this.inputName);
    if(!pointer.output) return null;
    
    let inputPin = BrainGraph.getBlock(this.inputNodeID).inputPins.get(this.inputName);
    let outputPin = BrainGraph.getBlock(pointer.output.node.id).outputPins.get(pointer.output.name);

    pointer.disconnect();

    inputPin.refreshSymbol();
    outputPin.refreshSymbol();

    return this;
  }

  undo() {
    Commander.create('CreateDataLink', this.inputNodeID, this.inputName, this.outputNodeID, this.outputName).processAndSave()
  }

  redo() {
    this.process();
  }
}