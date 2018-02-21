import Command from "./Command";

export default class CreateExecution extends Command
{
  constructor(sourceNodeID, name, targetNodeID) {
    super();
    this.sourceNodeID = sourceNodeID;
    this.name = name;
    this.targetNodeID = targetNodeID;

    // Check if source node is isolated
    let oldTargetNode = LookUp.get(this.sourceNodeID).execution.get(name);
    if(oldTargetNode) {
      this.oldTargetID = oldTargetNode.id;
    }
  }

  process() {
    LookUp.get(this.sourceNodeID).connectNext(LookUp.get(this.targetNodeID), this.name);
    
    // Only need to refresh 4 nodes' execution pins. You could go further only
    // refresh specific out pin.
    BrainGraph.getBlock(this.sourceNodeID).outPins.get(this.name).refreshSymbol();
    BrainGraph.getBlock(this.targetNodeID).inPin.refreshSymbol();
    if(this.oldTargetID) BrainGraph.getBlock(this.oldTargetID).inPin.refreshSymbol();

    return this;
  }

  undo() {
    if(this.oldTargetID) {
      LookUp.get(this.sourceNodeID).connectNext(LookUp.get(this.oldTargetID), this.name);
    }
    else {
      LookUp.get(this.sourceNodeID).disconnectNext(LookUp.get(this.targetNodeID), this.name);
    }
    BrainGraph.refresh()
  }

  redo() {
    this.process();
    BrainGraph.refresh()
  }
}