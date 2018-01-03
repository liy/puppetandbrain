import ConnectHelper from "../ConnectHelper";
import ExecutionSymbol from "./ExecutionSymbol";

export default class ExecutionInSymbol extends ExecutionSymbol
{
  constructor() {
    super('', 'in');
    
    this.inCircle.setAttribute('visibility', 'visible');
    this.outCircle.setAttribute('visibility', 'hidden');
    this.targetPath = this.inCircle;

    this.offsetX = 20;
  }

  init(node) {
    super.init(node);

    if(this.isConnected) {
      this.inCircle.setAttribute('fill', '#D0E400');
    }
    else {
      this.inCircle.setAttribute('fill', 'none');
    }
  }

  get isConnected() {
    return this.node.callers.length != 0;
  }

  refresh() {
    if(this.isConnected) {
      this.inCircle.setAttribute('fill', '#D0E400');
    }
    else {
      this.inCircle.setAttribute('fill', 'none');
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
    return this.node.callers.getValues().map(caller => {
      let block = BrainGraph.getBlock(caller.task.id);
      return block.outPins.get(caller.executionName);
    })
  }
  
  drawConnection() {
    let pins = this.getConnectedPins();
    for(let pin of pins) {
      pin.drawConnection();
    }
  }
}