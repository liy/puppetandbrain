import DataPin from "./DataPin";
import ConnectionHelper from './ConnectionHelper';

export default class OutputPin extends DataPin
{
  constructor(block, name) {
    super(block, name, 'right');
    this.type = 'output'
    this.output = this.node.outputs.get(this.name);

    this.icon.className = 'icon out-disconnected';
  }

  get isConnected() {
    // The output will have multiple connections, as there might be
    // other inputs referencing this output.
    return this.output.isConnected;
  }

  refresh() {
    this.icon.className = this.isConnected ? 'icon out-connected' : 'icon out-disconnected';
    this.drawConnection();
  }

  getInputPins() {
    let pointers = this.output.getPointers();
    return pointers.map(pointer => {
      let inputBlock = BrainGraph.getBlock(pointer.inputNode.id);
      return inputBlock.inputPins.get(pointer.inputName)
    });
  }

  drawConnection() {
    let pointers = this.output.getPointers();
    for(let pointer of pointers) {
      // inputPin.drawConnection();
      let inputBlock = BrainGraph.getBlock(pointer.inputNode.id);
      inputBlock.inputPins.get(pointer.inputName).drawConnection();
    }
  }

  mouseMove(e) {
    ConnectionHelper.drawLine(e.clientX, e.clientY, this.position.x, this.position.y);
  }

  removeConnections() {
    let inputPins = this.getInputPins();
    for(let inputPin of inputPins) {
      inputPin.pointer.disconnect();
      inputPin.refresh();
    }
    this.refresh();
  }
}