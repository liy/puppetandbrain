import Command from "./Command";

export default class CreateExecution extends Command
{
  constructor(sourceNodeID, executionName, targetNodeID) {
    super();
    this.sourceNodeID = sourceNodeID;
    this.executionName = executionName;
    this.targetNodeID = targetNodeID;

    // Check if source node is isolated
    let oldTargetNode = LookUp.get(this.sourceNodeID).execution.get(executionName);
    if(oldTargetNode) {
      this.oldTargetID = oldTargetNode.id;
    }
  }

  process() {
    LookUp.get(this.sourceNodeID).connectNext(LookUp.get(this.targetNodeID), this.executionName);
    
    // Only need to refresh 4 nodes' execution pins. You could go further only
    // refresh specific out pin.
    BrainGraph.getBlock(this.sourceNodeID).outPins.get(this.executionName).refresh();
    BrainGraph.getBlock(this.targetNodeID).inPin.refresh();
    if(this.oldTargetID) BrainGraph.getBlock(this.oldTargetID).inPin.refresh();

    return this;
  }

  undo() {
    if(this.oldTargetID) {
      LookUp.get(this.sourceNodeID).connectNext(LookUp.get(this.oldTargetID), this.executionName);
    }
    else {
      LookUp.get(this.sourceNodeID).disconnectNext(LookUp.get(this.targetNodeID), this.executionName);
    }
    BrainGraph.refresh()
  }

  redo() {
    this.processAndSave();
    BrainGraph.refresh()
  }
}