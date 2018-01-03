import DataSymbol from "./DataSymbol";
import ConnectHelper from '../ConnectHelper';

export default class OutputSymbol extends DataSymbol
{
  constructor(name) {
    super(name, 'out');

    // offset the circle a little bit
    this.circlePath.setAttribute('cx', 15);
    this.circlePath.setAttribute('fill', '#98C6DE');
    this.circlePath.setAttribute('stroke', 'none');

    this.extendPath.setAttribute('d', `M15,19 h19`);

    this.offsetX = -32;
    
    this.connected = true;
  }

  init(node) {
    super.init(node);
    this.output = this.node.outputs.get(this.name);
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()
      History.push(Commander.create('CreateDataLink', ConnectHelper.startSymbol.node.id, ConnectHelper.startSymbol.name, 
        this.node.id, this.name).processAndSave());
    }
    ConnectHelper.stop(e);
  }
  
  onContextMenu(e) {
    super.onContextMenu(e);
    History.push(Commander.create('RemoveOutputDataLink', this.node.id, this.name).processAndSave());
  }

  drawConnection() {
    let pointers = this.output.getPointers();
    for(let pointer of pointers) {
      let inputBlock = BrainGraph.getBlock(pointer.inputNode.id);
      inputBlock.inputPins.get(pointer.inputName).drawConnection();
    }
  }
}