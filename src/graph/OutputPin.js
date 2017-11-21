import DataPin from "./DataPin";

export default class OutputPin extends DataPin
{
  constructor(block, name) {
    super(block, name, 'right');

    this.icon.className = 'icon out-disconnected';
  }

  get isConnected() {
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
      inputBlock.inputPins.get(pointer.inputName)
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
}