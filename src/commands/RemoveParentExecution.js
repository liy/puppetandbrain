import Command from "./Command";

export default class RemoveParentExecution extends Command
{
  constructor(sourceNodeID) {
    super();

    this.sourceNodeID = sourceNodeID;
    let sourceNode = LookUp.get(this.sourceNodeID );
    this.callers = sourceNode.callers.getValues().map(caller => {
      return {
        id: caller.task.id,
        executionName: caller.executionName,
      }
    })
  }

  process() {
    for(let caller of this.callers) {
      LookUp.get(this.sourceNodeID).disconnectParent(LookUp.get(caller.id), caller.executionName);

      // refresh the caller's output pins
      let callerBlock = BrainGraph.getBlock(caller.id);
      callerBlock.outPins.get(caller.executionName).refreshSymbol();
    }
    
    // refresh this input pin
    let inPin = BrainGraph.getBlock(this.sourceNodeID).inPin;
    inPin.refreshSymbol();

    return this;
  }

  undo() {
    for(let caller of this.callers) {
      LookUp.get(this.sourceNodeID).connectParent(LookUp.get(caller.id), caller.executionName);
    }
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}