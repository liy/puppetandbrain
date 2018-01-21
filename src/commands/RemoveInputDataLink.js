import Command from './Command';

export default class RemoveInputDataLink extends Command
{
  constructor(inputNodeID, inputName) {
    super();

    this.inputNodeID = inputNodeID;
    this.inputName = inputName;
    let input = this.inputNode.inputs.get(this.inputName);
    if(input.output) {
      this.outputNodeID = input.output.node.id;
      this.outputName = input.output.name;
    }
  }

  get inputNode() {
    return LookUp.get(this.inputNodeID)
  }

  get input() {
    return this.inputNode.inputs.get(this.inputName);
  }

  process() {
    if(!this.input.output) return null;

    let input = this.inputNode.inputs.get(this.inputName);
    
    let inputPin = BrainGraph.getBlock(this.inputNodeID).inputPins.get(this.inputName);
    let outputPin = BrainGraph.getBlock(input.output.node.id).outputPins.get(input.output.name);

    input.disconnect();

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