import Command from "./Command";

export default class RemoveExecution extends Command
{
  constructor(sourceNode, name) {
    super();

    let targetNode = sourceNode.execution.get(name);
    this.targetID = targetNode ? targetNode.id : null;
    
    this.sourceID = sourceNode.id;
    this.name = name;
  }

  process() {
    // return null does not change state, history will not be recorded
    if(!this.targetID) return null;

    let sourceNode = this.lookUp.get(this.sourceID);
    sourceNode.disconnectNext(this.lookUp.get(this.targetID), this.name);
    BrainGraph.getBlock(this.targetID).inPin.refreshSymbol();

    let sourceBlock = BrainGraph.getBlock(this.sourceID);
    sourceBlock.outPins.get(this.name).refreshSymbol();
    return this;
  }

  undo() {
    this.lookUp.get(this.sourceID).connectNext(this.lookUp.get(this.targetID), this.name);
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}