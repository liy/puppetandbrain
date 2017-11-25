import Command from "./Command";

export default class CreateDataLink extends Command
{
  constructor(inputNodeID, inputName, outputNodeID, outputName) {
    super();

    this.inputNodeID = inputNodeID;
    this.inputName = inputName;
    this.outputNodeID = outputNodeID;
    this.outputName = outputName;
    
    this.oldPointerPod = this.inputNode.inputs.get(this.inputName).pod();
  }

  get inputNode() {
    return LookUp.get(this.inputNodeID)
  }

  get outputNode() {
    return LookUp.get(this.outputNodeID);
  }

  process() {
    let pointer = this.inputNode.inputs.get(this.inputName);
    let output = this.outputNode.outputs.get(this.outputName);

    let oldOutput = pointer.connect(output);

    // Refresh the removed old output pin.
    if(oldOutput) {
      let block = BrainGraph.getBlock(oldOutput.node.id);
      block.outputPins.get(oldOutput.name).refresh();
    }

    // refresh the new input and output pins
    let inputPin = BrainGraph.getBlock(this.inputNodeID).inputPins.get(this.inputName);
    let outputPin = BrainGraph.getBlock(this.outputNodeID).outputPins.get(this.outputName);    
    inputPin.refresh();
    outputPin.refresh();

    return this;
  }

  undo() {
    let pointer = this.inputNode.inputs.get(this.inputName);
    pointer.disconnect();
    // note that this pointer could be local pointer
    // when undo better to disconnect first before set the pointer to the old pointer pod.
    pointer.set(this.oldPointerPod);
    BrainGraph.refresh()
  }

  redo() {
    this.process();
  }
}