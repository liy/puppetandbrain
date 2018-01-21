import Command from "./Command";

export default class CreateDataLink extends Command
{
  constructor(inputNodeID, inputName, outputNodeID, outputName) {
    super();

    this.inputNodeID = inputNodeID;
    this.inputName = inputName;
    this.outputNodeID = outputNodeID;
    this.outputName = outputName;
    
    let oldInput = this.inputNode.inputs.get(this.inputName);
    if(oldInput) this.oldInputPod = oldInput.pod();
  }

  get inputNode() {
    return LookUp.get(this.inputNodeID)
  }

  get outputNode() {
    return LookUp.get(this.outputNodeID);
  }

  process() {
    let input = this.inputNode.inputs.get(this.inputName);
    let output = this.outputNode.outputs.get(this.outputName);

    let oldOutput = input.connect(output);

    // Refresh the removed old output pin.
    if(oldOutput) {
      let block = BrainGraph.getBlock(oldOutput.node.id);
      block.outputPins.get(oldOutput.name).refreshSymbol();
    }

    // refreshSymbol the new input and output pins
    let inputPin = BrainGraph.getBlock(this.inputNodeID).inputPins.get(this.inputName);
    let outputPin = BrainGraph.getBlock(this.outputNodeID).outputPins.get(this.outputName);    
    inputPin.refreshSymbol();
    outputPin.refreshSymbol();

    return this;
  }

  undo() {
    let input = this.inputNode.inputs.get(this.inputName);
    input.disconnect();
    // note that this input could be local input
    // when undo better to disconnect first before set the input to the old input pod.
    if(this.oldInputPod) input.set(this.oldInputPod);
    BrainGraph.refresh()
  }

  redo() {
    this.process();
  }
}