import Command from "./Command";

export default class RemoveExecution extends Command
{
  constructor(sourceNode, executionName) {
    super();

    let targetNode = sourceNode.execution.get(executionName);
    this.targetID = targetNode ? targetNode.id : null;
    
    this.sourceID = sourceNode.id;
    this.executionName = executionName;
  }

  process() {
    // return null does not change state, history will not be recorded
    if(!this.targetID) return null;

    let sourceNode = LookUp.get(this.sourceID);
    sourceNode.disconnectNext(LookUp.get(this.targetID), this.executionName);
    BrainGraph.getBlock(this.targetID).inPin.refresh();

    let sourceBlock = BrainGraph.getBlock(this.sourceID);
    sourceBlock.outPins.get(this.executionName).refresh();
    return this;
  }

  undo() {
    LookUp.get(this.sourceID).connectNext(LookUp.get(this.targetID), this.executionName);
    BrainGraph.refresh();
  }

  redo() {
    this.processAndSave();
  }
}