import Command from './Command'

export default class extends Command
{
  constructor(nodeID, pinName, descriptor) {
    super();

    this.nodeID = nodeID;
    this.pinName = pinName;
    this.descriptor = descriptor;
  }

  get node() {
    return this.lookUp.get(this.nodeID);
  }

  process() {
    this.node.outputs.add(this.pinName, this.descriptor);
    return this;
  }

  undo() {
    this.node.outputs.remove(this.pinName);
  }

  redo() {
    this.process();
  }
}