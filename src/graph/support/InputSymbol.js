import DataSymbol from "./DataSymbol";
import ConnectHelper from "../ConnectHelper";
import InputIcon from '../../assets/input.svg';
import {svgElement} from '../../utils/utils';
import DataColor from "../../data/DataColor";
import DataType from "../../data/DataType";
import SoundEffect from '../../SoundEffect';

export default class InputSymbol extends DataSymbol
{
  constructor(name) {
    super(name, 'in');

    this.svg = svgElement(InputIcon, {width:34, height:38, className:'data-svg'});
    this.svg.style.pointerEvents = 'none';
    this.element.appendChild(this.svg);

    this.connectionPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.connectionPath.setAttribute('stroke-width', 2);
    this.connectionPath.setAttribute('stroke-opacity', 1);
    this.connectionPath.setAttribute('fill', 'none');

    this._offsetX = 23;
  }

  init(node) {
    super.init(node);
    this.input = this.node.inputs.get(this.name);

    this.connectionPath.setAttribute('stroke', this.hexColor);

    if(this.isConnected) {
      // this.svg.style.setProperty('--fill', '#98C6DE');
      this.svg.style.setProperty('--fill', this.hexColor);
      this.svg.style.setProperty('--stroke', 'none');
    }
    else {
      this.svg.style.setProperty('--fill', 'none');
      // this.svg.style.setProperty('--stroke', '#98C6DE');
      this.svg.style.setProperty('--stroke', this.hexColor);
    }
  }

  get isConnected() {
    return this.input.isConnected;
  }

  refresh() {
    if(this.isConnected) {
      this.drawConnection();
      BrainGraph.svg.appendChild(this.connectionPath);
      this.svg.style.setProperty('--fill', this.hexColor);
      this.svg.style.setProperty('--stroke', 'none');
    }
    else {
      if(BrainGraph.svg.contains(this.connectionPath)) BrainGraph.svg.removeChild(this.connectionPath);
      this.svg.style.setProperty('--fill', 'none');
      this.svg.style.setProperty('--stroke', this.hexColor);
    }
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      SoundEffect.play('link');
      History.push(Commander.create('CreateDataLink', this.node.id, this.name, 
        ConnectHelper.startSymbol.node.id, ConnectHelper.startSymbol.name).processAndSave())
    }
    ConnectHelper.stop(e);
  }

  getOutputPin() {
    if(!this.input.isConnected) return null;
    return BrainGraph.getBlock(this.input.output.node.id).outputPins.get(this.input.output.name);
  }

  onContextMenu(e) {
    super.onContextMenu(e);
    History.push(Commander.create('RemoveInputDataLink', this.node.id, this.name).processAndSave());
  }
  
  drawConnection() {
    const pin = this.getOutputPin();
    if(!pin) return;

    this.drawLine(pin.symbol.position.x, pin.symbol.position.y, this.connectionPath);
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
    return DataColor[this.input.type] || DataColor[DataType.GENERIC];
  }

  colorize(dataType) {
    let color = DataColor[dataType] || DataColor[DataType.GENERIC];
    this.svg.style.setProperty('--stroke', `#${color.toString(16)}`);
  }
}