import DataSymbol from "./DataSymbol";
import ConnectHelper from '../ConnectHelper';
import OutputIcon from '../../assets/output.svg';
import {svgElement} from '../../utils/utils';

export default class OutputSymbol extends DataSymbol
{
  constructor(name) {
    super(name, 'out');

    this.svg = svgElement(OutputIcon, {width:34, height:38, className:'data-svg'});
    this.svg.style.pointerEvents = 'none';
    this.element.appendChild(this.svg);

    this.extendPath.setAttribute('d', `M15,19 h19`);

    this._offsetX = -23;
    
    this.connected = true;
  }

  init(node) {
    super.init(node);
    this.output = this.node.outputs.get(this.name);
  }

  get isConnected() {
    // The output will have multiple connections, as there might be
    // other inputs referencing this output.
    return this.output.isConnected;
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

  get position() {
    let offset = BrainGraph.svg.getBoundingClientRect();
    let rect = this.svg.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}