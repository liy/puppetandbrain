import ExecutionPin from "./ExecutionPin";

export default class ExecutionInPin extends ExecutionPin
{
  constructor() {
    super('', 'left')

    this.connectedPin = null
  }

  connect(outPin) {
    outPin.connect(this)
  }

  drawConnection() {
    if(this.connectedPin) {
      this.connectedPin.drawConnection();
    }
  }
}