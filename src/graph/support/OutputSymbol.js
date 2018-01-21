import DataSymbol from "./DataSymbol";
import ConnectHelper from '../ConnectHelper';
import OutputIcon from '../../assets/output.svg';
import {svgElement} from '../../utils/utils';
import DataColor from "../../data/DataColor";
import DataType from "../../data/DataType";

const linkSound = new Audio(require('../../assets/sounds/link.mp3'));

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
    if(this.canConnect(ConnectHelper.startSymbol)) {
      linkSound.play()
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
    let inputs = this.output.getInputs();
    for(let input of inputs) {
      let inputBlock = BrainGraph.getBlock(input.node.id);
      inputBlock.inputPins.get(input.name).drawConnection();
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
    return DataColor[this.output.type] || DataColor[DataType.GENERIC];
  }

  colorize(dataType) {
    let color = DataColor[dataType] || DataColor[DataType.GENERIC];
    this.svg.style.setProperty('--fill', `#${color.toString(16)}`);
  }
}