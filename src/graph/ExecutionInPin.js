import ExecutionPin from "./ExecutionPin";
import ConnectionHelper from './ConnectionHelper';

export default class ExecutionInPin extends ExecutionPin
{
  constructor(block) {
    super(block, '', 'left')
  }

  getConnectedPins() {
    // let parentTask = this.node.parent;
    // if(!parentTask) return null;

    // let block = this.graph.getBlock(parentTask.id);
    // return block.outPins.get(this.node.parentExecutionName);
    return this.node.callers.getValues().map(caller => {
      let block = this.graph.getBlock(caller.task.id);
      return block.outPins.get(caller.executionName);
    })
  }

  get isConnected() {
    return this.getConnectedPins().length != 0
  }

  refresh() {
    this.icon.className = this.isConnected ? 'icon in-connected' : 'icon in-disconnected';
  }

  drawConnection() {
    let connectedPins = this.getConnectedPins();
    for(let pin of connectedPins) {
      pin.drawConnection();
    }
  }

  mouseMove(e) {
    // TODO: create a temp link, between initial execution pin position to current mouse position
    ConnectionHelper.drawLine(this.position.x, this.position.y, e.clientX, e.clientY);
  }

  removeConnections() {
    // disconnect all parent connections
    let callers = this.node.callers.getValues().concat();
    for(let caller of callers) {
      this.node.disconnectParent(caller.task, caller.executionName);

      let callerBlock = this.graph.getBlock(caller.task.id);
      callerBlock.outPins.get(caller.executionName).refresh();
    }

    this.refresh();
  }
}