import Command from './Command';

export default class RemoveOutputDataLink extends Command
{
  constructor(outputNodeID, outputName) {
    super();

    this.outputNodeID = outputNodeID;
    this.outputName = outputName;

    // Keep track of raw input data, so we can restore the input in undo
    this.pointerPods = this.lookUp.get(this.outputNodeID).outputs.get(this.outputName).getPointers().map(pointer => {
      return pointer.pod()
    })
  }

  process() {
    for(let pod of this.pointerPods) {
      // Since pointer id can change... better to grab it from node
      let pointer = this.lookUp.get(pod.nodeID).inputs.get(pod.name);
      pointer.disconnect();

      BrainGraph.getBlock(pointer.node.id).inputPins.get(pointer.name).refreshSymbol();
    }
    BrainGraph.getBlock(this.outputNodeID).outputPins.get(this.outputName).refreshSymbol();

    return this;
  }

  undo() {
    // Note once pointer is disconnected, it is removed from lookup table.... not sure whether it is a good thing or not
    for(let pod of this.pointerPods) {
      // so we grab the pointer from the node, and restore it using the pointer pod
      let pointer = this.lookUp.get(pod.nodeID).inputs.get(pod.name);
      pointer.set(pod);
    }
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}