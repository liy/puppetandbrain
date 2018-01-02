import ConnectHelper from "../ConnectHelper";
import ExecutionSymbol from "./ExecutionSymbol";

export default class ExecutionInSymbol extends ExecutionSymbol
{
  constructor(node) {
    super(node, '', 'in');

    
    this.inCircle.setAttribute('visibility', 'visible');
    this.outCircle.setAttribute('visibility', 'hidden');
    this.targetPath = this.inCircle;

    this.offsetX = 20;
  }

  mouseUp(e) {
    if(this.canConnect(ConnectHelper.startSymbol)) {
      this.linkSound.play()      
      History.push(Commander.create('CreateExecution', ConnectHelper.startDataSymbol.node.id, ConnectHelper.startDataSymbol.name, this.node.id).processAndSave());
    }
    ConnectHelper.stop(e);
  }
}