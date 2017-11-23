import ExecutionPin from "./ExecutionPin";
import ConnectHelper from './ConnectHelper';

export default class ExecutionInPin extends ExecutionPin
{
  constructor(block) {
    super(block, '', 'left')
  }

  getConnectedPins() {
    return this.node.callers.getValues().map(caller => {
      let block = BrainGraph.getBlock(caller.task.id);
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
    // create a temp link, between initial execution pin position to current mouse position
    ConnectHelper.drawLine(this.position.x, this.position.y, e.clientX, e.clientY);
  }

  rightMouseDown(e) {
    super.rightMouseDown(e)

    // Loop through all callers to remove execution, note that process
    // does not refresh, manual refresh has to be made
    History.push(Commander.create('RemoveParentExecution', this.node.id).process());
  }
}