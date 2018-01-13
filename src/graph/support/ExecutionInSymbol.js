import ConnectHelper from "../ConnectHelper";
import ExecutionSymbol from "./ExecutionSymbol";
import {svgElement} from '../../utils/utils';
import ExecutionInIcon from '../../assets/execution-in.svg';

export default class ExecutionInSymbol extends ExecutionSymbol
{
  constructor() {
    super('', 'in');
    
    this.svg = svgElement(ExecutionInIcon, {className: 'execution-svg', width:43, height:22})
    this.element.appendChild(this.svg)

    this._offsetX = 20;
  }

  init(node) {
    super.init(node);

    if(this.isConnected) {
      this.svg.style.setProperty('--fill', '#D0E400');
    }
    else {
      this.svg.style.setProperty('--fill', 'none');
    }
  }

  get isConnected() {
    return this.node.enter.isConnected;
  }

  refresh() {
    if(this.isConnected) {
      this.svg.style.setProperty('--fill', '#D0E400');
    }
    else {
      this.svg.style.setProperty('--fill', 'none');
    }
  }

  onContextMenu(e) {
    super.onContextMenu(e)

    // Loop through all callers to remove execution, note that process
    // does not refresh, manual refresh has to be made
    History.push(Commander.create('RemoveParentExecution', this.node.id).processAndSave());
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()      
      History.push(Commander.create('CreateExecution', ConnectHelper.startSymbol.node.id, 
        ConnectHelper.startSymbol.name, this.node.id).processAndSave());
    }
    ConnectHelper.stop(e);
  }
  
  getConnectedPins() {
    return this.node.getCallers().map(caller => {
      let block = BrainGraph.getBlock(caller.nodeID);
      return block.outPins.get(caller.executionName);
    })
  }
  
  drawConnection() {
    let pins = this.getConnectedPins();
    for(let pin of pins) {
      pin.drawConnection();
    }
  }
  
  get position() {
    let offset = BrainGraph.svg.getBoundingClientRect();
    let rect = this.svg.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left - 11.3*BrainGraph.scale,
      y: (rect.top + rect.bottom)/2
    }
  }
}