import ConnectHelper from "../ConnectHelper";
import ExecutionSymbol from "./ExecutionSymbol";

export default class ExecutionOutSymbol extends ExecutionSymbol
{
  constructor(node, name) {
    super(node, name, 'out');
    
    this.inCircle.setAttribute('visibility', 'hidden');
    this.outCircle.setAttribute('visibility', 'visible');
    this.targetPath = this.outCircle;

    this.offsetX = -20;
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()      
      History.push(Commander.create('CreateExecution', this.node.id, this.node.name, ConnectHelper.startDataSymbol.node.id).processAndSave());
    }
    ConnectHelper.stop(e);
  }
}