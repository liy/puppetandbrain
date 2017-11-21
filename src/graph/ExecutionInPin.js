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

  mouseMove(e) {
    // TODO: create a temp link, between initial execution pin position to current mouse position
    ConnectionHelper.drawLine(this.position.x, this.position.y, e.clientX, e.clientY);
  }

  removeConnection(e) {
    super.removeConnection(e);

    let parentNode = this.node.parent;
    let parentExecutionName = this.node.parentExecutionName;
    this.node.disconnectParent(this.node.parentExecutionName)

    if(parentNode) {
      let parentBlock = this.graph.getBlock(parentNode.id);
      parentBlock.outPins.get(parentExecutionName).refresh();
    }
    this.refresh();
  }
}