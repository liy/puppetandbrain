import DataSymbol from "./DataSymbol";
import ConnectHelper from "../ConnectHelper";

export default class InputSymbol extends DataSymbol
{
  constructor(name) {
    super(name, 'in');

    this.connectionPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.connectionPath.setAttribute('stroke', '#98c6de');
    this.connectionPath.setAttribute('stroke-width', 2);
    this.connectionPath.setAttribute('stroke-opacity', 1);
    this.connectionPath.setAttribute('fill', 'none');

    // offset the circle a little bit
    this.circlePath.setAttribute('cx', 19);

    this.extendPath.setAttribute('d', `M13,19 h-21`);

    this.offsetX = 32;
  }

  init(node) {
    super.init(node);
    this.pointer = this.node.inputs.get(this.name);
  }

  set connected(v) {
    super.connected = v;
    this.refresh();
  }

  refresh() {
    if(this.canConnect) {
      this.drawConnection();
      BrainGraph.svg.appendChild(this.connectionPath);
    }
    else {
      if(BrainGraph.svg.contains(this.connectionPath)) BrainGraph.svg.removeChild(this.connectionPath);
    }
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()
      // History.push(Commander.create('CreateDataLink', this.node.id, this.name, 
      //   ConnectHelper.startSymbol.node.id, ConnectHelper.startSymbol.name).processAndSave())
    }
    ConnectHelper.stop(e);
  }

  getOutputPin() {
    if(!this.pointer.isOutputPointer) return null;
    return BrainGraph.getBlock(this.pointer.output.node.id).outputPins.get(this.pointer.output.name);
  }

  drawConnection() {
    const pin = this.getOutputPin();
    if(!pin) return;

    this.drawLine(pin.symbol.position.x, pin.symbol.position.y, this.connectionPath);
  }

  onContextMenu(e) {
    super.onContextMenu(e);
    History.push(Commander.create('RemoveInputDataLink', this.node.id, this.name).processAndSave());
  }
}