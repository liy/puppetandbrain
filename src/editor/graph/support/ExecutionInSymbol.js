import ExecutionSymbol from "./ExecutionSymbol";
import {svgElement} from '@/utils/utils';
import ExecutionInIcon from '@/assets/execution-in.svg';
import SoundEffect from '@/SoundEffect';

export default class ExecutionInSymbol extends ExecutionSymbol
{
  constructor() {
    super('', 'in');
    
    this.svg = svgElement(ExecutionInIcon, {width:43, height:22})
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
    Hub.history.push(Commander.create('RemoveParentExecution', this.node.id).processAndSave());
    
    // As the link is broken, make sense to deselect the selected symbol
    BrainGraph.connectHelper.stop();
  }

  mouseUp(e) {
    if(this.canConnect(BrainGraph.connectHelper.startSymbol)) {
      SoundEffect.play('link')      
      Hub.history.push(Commander.create('CreateExecution', BrainGraph.connectHelper.startSymbol.node.id, 
        BrainGraph.connectHelper.startSymbol.name, this.node.id).processAndSave());
    }
    BrainGraph.connectHelper.stop(e);
  }
  
  touchDown(e) {
    if(this.canConnect(BrainGraph.connectHelper.selectedSymbol)) {
      SoundEffect.play('link');
      Hub.history.push(Commander.create('CreateExecution', BrainGraph.connectHelper.selectedSymbol.node.id, 
        BrainGraph.connectHelper.selectedSymbol.name, this.node.id).processAndSave());
      
      // once a valid connection is made, deselect the sybmosl
      BrainGraph.connectHelper.stop()
      return;
    }
    BrainGraph.connectHelper.startExecutionSymbol(this);
  }

  getConnectedPins() {
    return this.node.getCallers().map(caller => {
      let block = BrainGraph.getBlock(caller.nodeID);
      return block.outPins.get(caller.executionName);
    })
  }
  
  drawConnection() {
    super.drawConnection();
    
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