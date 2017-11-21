import ExecutionPin from "./ExecutionPin";
import ConnectionHelper from './ConnectionHelper';

export default class ExecutionInPin extends ExecutionPin
{
  constructor(block) {
    super(block, '', 'left')

    this.parentTask = this.node.parent;
    this.parentExecutionName = this.node.parentExecutionName;

    this.connectedPin = null
  }

  connect(outPin) {
    outPin.connect(this)
  }

  connected(outPin) {
    this.icon.className = 'icon in-connected';
    this.connectedPin = outPin;
  }

  disconnect() {
    this.connectedPin = null;
    this.icon.className = 'icon in-disconnected';
  }

  drawConnection() {
    if(this.connectedPin) {
      this.connectedPin.drawConnection();
    }
  }

  mouseDown(e) {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);

    ConnectionHelper.start(this, e);
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