import ConnectHelper from "../ConnectHelper";
import ExecutionSymbol from "./ExecutionSymbol";
import {svgElement} from '../../utils/utils';
import ExecutionOutIcon from '../../assets/execution-out.svg';
import SoundEffect from '../../SoundEffect';

export default class ExecutionOutSymbol extends ExecutionSymbol
{
  constructor(name) {
    super(name, 'out');
    
    this.svg = svgElement(ExecutionOutIcon, {className: 'execution-svg', width:43, height:22})
    this.element.appendChild(this.svg)

    this.connectionPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.connectionPath.setAttribute('stroke', '#d0e400');
    this.connectionPath.setAttribute('stroke-width', 3);
    this.connectionPath.setAttribute('stroke-opacity', 1);
    this.connectionPath.setAttribute('fill', 'none');

    this._offsetX = -20;
  }

  init(node) {
    super.init(node);

    // this.node.on('task.start', task => {
    //   this.connectionPath.setAttribute('stroke', '#ffbb00');
    //   setTimeout(() => {
    //     this.connectionPath.setAttribute('stroke', '#d0e400');
    //   }, 500);
    // })
  }
  
  get isConnected() {
    return this.node.execution.get(this.name) != null;
  }

  refresh() {
    // debugger;
    if(this.isConnected) {
      this.drawConnection();
      BrainGraph.svg.appendChild(this.connectionPath);
    }
    else {
      if(BrainGraph.svg.contains(this.connectionPath)) BrainGraph.svg.removeChild(this.connectionPath);
    }
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      SoundEffect.play('link');
      History.push(Commander.create('CreateExecution', this.node.id, this.name, ConnectHelper.startSymbol.node.id).processAndSave());
    }
    ConnectHelper.stop(e);
  }

  getConnectedPin() {
    const targetTask = this.node.execution.get(this.name);
    if(!targetTask) return null;

    const block = BrainGraph.getBlock(targetTask.id);
    return block.inPin;
  }

  onContextMenu(e) {
    super.onContextMenu(e)
    History.push(Commander.create('RemoveExecution', this.node, this.name).processAndSave());
  }

  drawConnection() {
    const pin = this.getConnectedPin();
    if(!pin) return;

    this.drawLine(pin.symbol.position.x, pin.symbol.position.y, this.connectionPath);
  }

  get position() {
    let offset = BrainGraph.svg.getBoundingClientRect();
    let rect = this.svg.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left + 6.7*BrainGraph.scale,
      y: (rect.top + rect.bottom)/2
    }
  }
}