import ExecutionPin from "./ExecutionPin";
import ConnectionHelper from './ConnectionHelper';

export default class ExecutionInPin extends ExecutionPin
{
  constructor(block) {
    super(block, '', 'left')
  }

  getConnectedPin() {
    let parentTask = this.node.parent;
    if(!parentTask) return null;

    let block = this.graph.getBlock(parentTask.id);
    return block.outPins.get(this.node.parentExecutionName);
  }

  get isConnected() {
    return this.getConnectedPin() != null;
  }

  refresh() {
    this.icon.className = this.isConnected ? 'icon in-connected' : 'icon in-disconnected';
  }

  drawConnection() {
    let connectedPin = this.getConnectedPin();
    if(connectedPin) {
      connectedPin.drawConnection();
    }
  }

  mouseDown(e) {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);

    ConnectionHelper.startExecutionPin(this, e);
  }

  mouseMove(e) {
    // TODO: create a temp link, between initial execution pin position to current mouse position
    ConnectionHelper.drawLine(this.position.x, this.position.y, e.clientX, e.clientY);
  }

  mouseUp(e) {
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp);
    ConnectionHelper.stop(e)
  }
}