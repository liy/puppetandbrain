import ConnectHelper from "../ConnectHelper";
import ExecutionSymbol from "./ExecutionSymbol";

export default class ExecutionOutSymbol extends ExecutionSymbol
{
  constructor(name) {
    super(name, 'out');
    
    this.inCircle.setAttribute('visibility', 'hidden');
    this.outCircle.setAttribute('visibility', 'visible');
    this.targetPath = this.outCircle;

    this.connectionPath = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.connectionPath.setAttribute('stroke', '#d0e400');
    this.connectionPath.setAttribute('stroke-width', 3);
    this.connectionPath.setAttribute('stroke-opacity', 1);
    this.connectionPath.setAttribute('fill', 'none');

    this.offsetX = -20;
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
      this.linkSound.play();      
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
}