import DataPin from "./DataPin";
import ConnectionHelper from './ConnectionHelper';

export default class OutputPin extends DataPin
{
  constructor(block, name) {
    super(block, name, 'right');
    this.type = 'output'

    this.icon.className = 'icon out-disconnected';
  }

  get isConnected() {
    // The output will have multiple connections, as there might be
    // other inputs referencing this output.
    return this.node.outputs.connections.get(this.name).length != 0
  }

  refresh() {
    this.icon.className = this.isConnected ? 'icon out-connected' : 'icon out-disconnected';
    this.drawConnection();
  }

  getInputPins() {
    let pointers = this.node.outputs.connections.get(this.name).getValues();
    return pointers.map(pointer => {
      let inputBlock = this.graph.getBlock(pointer.inputNode.id);
      return inputBlock.inputPins.get(pointer.inputName)
    });
  }

  drawConnection() {
    let pointers = this.node.outputs.connections.get(this.name).getValues();
    for(let pointer of pointers) {
      // inputPin.drawConnection();
      let inputBlock = this.graph.getBlock(pointer.inputNode.id);
      inputBlock.inputPins.get(pointer.inputName).drawConnection();
    }
  }

  mouseMove(e) {
    ConnectionHelper.drawLine(e.clientX, e.clientY, this.position.x, this.position.y);
  }

  removeConnections(e) {
    super.removeConnections(e);
    let inputPins = this.getInputPins();
    for(let inputPin of inputPins) {
      this.graph.brain.disconnectVariable(inputPin.getPointer());
      inputPin.refresh();
    }
    this.refresh();
  }
}