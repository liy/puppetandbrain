import DataSymbol from "./DataSymbol";
import OutputIcon from '@/assets/output.svg';
import {svgElement} from '@/utils/utils';
import DataColor from "../../data/DataColor";
import DataType from "../../data/DataType";
import SoundEffect from '@/SoundEffect';

export default class OutputSymbol extends DataSymbol
{
  constructor(name) {
    super(name, 'out');

    this.svg = svgElement(OutputIcon, {width:34, height:38, className:'data-svg'});
    this.svg.style.pointerEvents = 'none';
    this.element.appendChild(this.svg);

    this._offsetX = -23;
    
    this.connected = true;
  }

  init(node) {
    super.init(node);
    this.output = this.node.outputs.get(this.name);

    this.svg.style.setProperty('--fill', this.hexColor);
  }

  get isConnected() {
    // The output will have multiple connections, as there might be
    // other inputs referencing this output.
    return this.output.isConnected;
  }

  mouseUp(e) {
    if(this.canConnect(BrainGraph.connectHelper.startSymbol)) {
      SoundEffect.play('link');
      ActivityManager.history.push(Commander.create('CreateDataLink', BrainGraph.connectHelper.startSymbol.node.id, BrainGraph.connectHelper.startSymbol.name, 
        this.node.id, this.name).processAndSave());
    }
    BrainGraph.connectHelper.stop(e);
  }

  touchDown(e) {
    if(this.canConnect(BrainGraph.connectHelper.selectedSymbol)) {
      SoundEffect.play('link');
      ActivityManager.history.push(Commander.create('CreateDataLink', BrainGraph.connectHelper.selectedSymbol.node.id, BrainGraph.connectHelper.selectedSymbol.name, 
        this.node.id, this.name).processAndSave());

      // once a valid connection is made, deselect the sybmosl
      BrainGraph.connectHelper.stop(e)
    }
    BrainGraph.connectHelper.startDataSymbol(this);
  }
  
  onContextMenu(e) {
    super.onContextMenu(e);
    ActivityManager.history.push(Commander.create('RemoveOutputDataLink', this.node.id, this.name).processAndSave());
  }

  drawConnection() {
    super.drawConnection();
    
    let pointers = this.output.getPointers();
    for(let pointer of pointers) {
      let inputBlock = BrainGraph.getBlock(pointer.node.id);
      inputBlock.inputPins.get(pointer.name).drawConnection();
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

  get color() {
    return DataColor[this.output.descriptor.type] || DataColor[DataType.GENERIC];
  }

  colorize(dataType) {
    let color = DataColor[dataType] || DataColor[DataType.GENERIC];
    this.svg.style.setProperty('--fill', `#${color.toString(16)}`);
  }
}