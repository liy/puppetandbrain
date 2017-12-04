import DataPin from "./DataPin";
import ConnectHelper from './ConnectHelper';

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

  pointerMove(e) {
    this.updateSnapTarget(e);
    
    let sx = e.clientX ? e.clientX : e.touches[0].clientX 
    let sy = e.clientY ? e.clientY : e.touches[0].clientY
    ConnectHelper.drawLine(sx, sy, this.position.x, this.position.y);
  }

  onContextMenu(e) {
    super.onContextMenu(e);
    History.push(Commander.create('RemoveOutputDataLink', this.node.id, this.name).processAndSave());
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left + 4*BrainGraph.scale,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}