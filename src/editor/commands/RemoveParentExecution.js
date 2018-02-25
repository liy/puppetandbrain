import Command from "./Command";

export default class RemoveParentExecution extends Command
{
  constructor(sourceNodeID) {
    super();

    this.sourceNodeID = sourceNodeID;
    let sourceNode = this.lookUp.get(this.sourceNodeID );
    this.callerPods = sourceNode.getCallers();
  }

  process() {
    for(let pod of this.callerPods) {
      this.lookUp.get(this.sourceNodeID).disconnectParent(this.lookUp.get(pod.nodeID), pod.executionName);

      // refresh the pod's output pins
      let callerBlock = BrainGraph.getBlock(pod.nodeID);
      callerBlock.outPins.get(pod.executionName).refreshSymbol();
    }
    
    // refresh this input pin
    let inPin = BrainGraph.getBlock(this.sourceNodeID).inPin;
    inPin.refreshSymbol();

    return this;
  }

  undo() {
    for(let pod of this.callerPods) {
      this.lookUp.get(this.sourceNodeID).connectParent(this.lookUp.get(pod.nodeID), pod.executionName);
    }
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}