import ExecutionPin from "./ExecutionPin";

export default class ExecutionInPin extends ExecutionPin
{
  constructor() {
    super('')

    this.connectedPin = null
  }

  connect(outPin) {
    outPin.connect(this)
  }

  connected(outPin) {
    this.icon.className = 'icon in-connected';
    this.connectedPin = outPin;
  }

  drawConnection() {
    if(this.connectedPin) {
      this.connectedPin.drawConnection();
    }
  }
}