import Command from './Command';

export default class RemoveOutputDataLink extends Command
{
  constructor(outputNodeID, outputName) {
    super();

    this.outputNodeID = outputNodeID;
    this.outputName = outputName;

    // Keep track of raw pointer data, so we can restore the pointer in undo
    this.pointerPods = LookUp.get(this.outputNodeID).outputs.get(this.outputName).getPointers().map(pointer => {
      return pointer.pod()
    })
  }

  process() {
    for(let pod of this.pointerPods) {
      // Since pointer id can change... better to grab it from node
      let pointer = LookUp.get(pod.inputNode).inputs.get(pod.inputName);
      pointer.disconnect();

      BrainGraph.getBlock(pointer.inputNode.id).inputPins.get(pointer.inputName).refresh();
    }
    BrainGraph.getBlock(this.outputNodeID).outputPins.get(this.outputName).refresh();

    return this;
  }

  undo() {
    // Note once pointer is disconnected, it is removed from lookup table.... not sure whether it is a good thing or not
    for(let pod of this.pointerPods) {
      // so we grab the pointer from the node, and restore it using the pointer pod
      let pointer = LookUp.get(pod.inputNode).inputs.get(pod.inputName);
      pointer.set(pod);
    }
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}