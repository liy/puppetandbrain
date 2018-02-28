import './InputSymbol.scss';
import DataSymbol from "./DataSymbol";
import InputIcon from '@/assets/input.svg';
import {svgElement} from '@/utils/utils';
import DataColor from "../../data/DataColor";
import DataType from "../../data/DataType";
import SoundEffect from '@/SoundEffect';

export default class InputSymbol extends DataSymbol
{
  constructor(name) {
    super(name, 'in');

    this.svg = svgElement(InputIcon, {width:34, height:38, className:'data-svg'});
    this.svg.style.pointerEvents = 'none';
    this.element.appendChild(this.svg);

    this.connectionPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.connectionPath.setAttribute('stroke-linecap', 'round');
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
      this.svg.style.setProperty('--fill', this.hexColor);
      this.svg.style.setProperty('--stroke', 'none');
    }
    else {
      this.svg.style.setProperty('--fill', 'none');
      this.svg.style.setProperty('--stroke', this.hexColor);
    }
  }

  visualize() {
    // Do not constantly add class....ie game tick execution
    if(!this.connectionPath.classList.contains('input-visualization')) {
      this.connectionPath.classList.add('input-visualization');
      setTimeout(() => {
        this.connectionPath.classList.remove('input-visualization');
      }, 1000);
    }
  }

  get isConnected() {
    return this.input.isConnected;
  }

  refresh() {
    // when input type changes, the connection line stroke color needs changing as well
    this.connectionPath.setAttribute('stroke', this.hexColor);
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
    if(this.canConnect(BrainGraph.connectHelper.startSymbol)) {
      SoundEffect.play('link');
      ActivityManager.history.push(Commander.create('CreateDataLink', this.node.id, this.name, 
        BrainGraph.connectHelper.startSymbol.node.id, BrainGraph.connectHelper.startSymbol.name).processAndSave())
    }
    BrainGraph.connectHelper.stop(e);
  }

  touchDown(e) {
    if(this.canConnect(BrainGraph.connectHelper.selectedSymbol)) {
      SoundEffect.play('link');
      ActivityManager.history.push(Commander.create('CreateDataLink', this.node.id, this.name, 
        BrainGraph.connectHelper.selectedSymbol.node.id, BrainGraph.connectHelper.selectedSymbol.name).processAndSave())
      
      // once a valid connection is made, deselect the sybmosl
      BrainGraph.connectHelper.stop()
      return;
    }
    BrainGraph.connectHelper.startDataSymbol(this);
  }

  getOutputPin() {
    if(!this.input.isConnected) return null;
    return BrainGraph.getBlock(this.input.output.node.id).outputPins.get(this.input.output.name);
  }

  onContextMenu(e) {
    super.onContextMenu(e);
    ActivityManager.history.push(Commander.create('RemoveInputDataLink', this.node.id, this.name).processAndSave());
  }

  drawSelectionIndicator() {
    let p = this.position;

    console.log(p.x - 100, p.y)
    this.drawLine(p.x - 100, p.y, BrainGraph.connectHelper.path);
  }
  
  drawConnection() {
    super.drawConnection();
    
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