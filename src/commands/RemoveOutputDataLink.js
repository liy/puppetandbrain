import Command from './Command';

export default class RemoveOutputDataLink extends Command
{
  constructor(outputNodeID, outputName) {
    super();

    this.outputNodeID = outputNodeID;
    this.outputName = outputName;

    // Keep track of raw input data, so we can restore the input in undo
    this.inputPods = LookUp.get(this.outputNodeID).outputs.get(this.outputName).getInputs().map(input => {
      return input.pod()
    })
  }

  process() {
    for(let pod of this.inputPods) {
      // Since input id can change... better to grab it from node
      let input = LookUp.get(pod.nodeID).inputs.get(pod.name);
      input.disconnect();

      BrainGraph.getBlock(input.node.id).inputPins.get(input.name).refreshSymbol();
    }
    BrainGraph.getBlock(this.outputNodeID).outputPins.get(this.outputName).refreshSymbol();

    return this;
  }

  undo() {
    // Note once input is disconnected, it is removed from lookup table.... not sure whether it is a good thing or not
    for(let pod of this.inputPods) {
      // so we grab the input from the node, and restore it using the input pod
      let input = LookUp.get(pod.nodeID).inputs.get(pod.name);
      input.set(pod);
    }
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}