import Command from "./Command";

export default class CreateExecution extends Command
{
  constructor(sourceNodeID, name, targetNodeID) {
    super();
    this.sourceNodeID = sourceNodeID;
    this.name = name;
    this.targetNodeID = targetNodeID;

    // Check if source node is isolated
    let oldTargetNode = this.lookUp.get(this.sourceNodeID).execution.get(name);
    if(oldTargetNode) {
      this.oldTargetID = oldTargetNode.id;
    }
  }

  process() {
    this.lookUp.get(this.sourceNodeID).connectNext(this.lookUp.get(this.targetNodeID), this.name);
    
    // Only need to refresh 4 nodes' execution pins. You could go further only
    // refresh specific out pin.
    BrainGraph.getBlock(this.sourceNodeID).outPins.get(this.name).refreshSymbol();
    BrainGraph.getBlock(this.targetNodeID).inPin.refreshSymbol();
    if(this.oldTargetID) BrainGraph.getBlock(this.oldTargetID).inPin.refreshSymbol();

    return this;
  }

  undo() {
    if(this.oldTargetID) {
      this.lookUp.get(this.sourceNodeID).connectNext(this.lookUp.get(this.oldTargetID), this.name);
    }
    else {
      this.lookUp.get(this.sourceNodeID).disconnectNext(this.lookUp.get(this.targetNodeID), this.name);
    }
    BrainGraph.refresh()
  }

  redo() {
    this.process();
    BrainGraph.refresh()
  }
}