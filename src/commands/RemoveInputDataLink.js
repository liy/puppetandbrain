import Command from './Command';

export default class RemoveInputDataLink extends Command
{
  constructor(inputNodeID, inputNodeName) {
    super();

    this.inputNodeID = inputNodeID;
    this.inputNodeName = inputNodeName;
    let pointer = this.inputNode.inputs.get(this.inputNodeName);
    if(pointer.output) {
      this.outputNodeID = pointer.output.node.id;
      this.outputNodeName = pointer.output.name;
    }
  }

  get inputNode() {
    return LookUp.get(this.inputNodeID)
  }

  get pointer() {
    return this.inputNode.inputs.get(this.inputNodeName);
  }

  process() {
    if(!this.pointer.output) return null;

    let pointer = this.inputNode.inputs.get(this.inputNodeName);
    
    let inputPin = BrainGraph.getBlock(this.inputNodeID).inputPins.get(this.inputNodeName);
    let outputPin = BrainGraph.getBlock(pointer.output.node.id).outputPins.get(pointer.output.name);

    pointer.disconnect();

    inputPin.refresh();
    outputPin.refresh();

    return this;
  }

  undo() {
    Commander.create('CreateDataLink', this.inputNodeID, this.inputNodeName, this.outputNodeID, this.outputNodeName).processAndSave()
  }

  redo() {
    this.processAndSave();
  }
}