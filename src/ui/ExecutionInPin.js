import ExecutionPin from "./ExecutionPin";

export default class ExecutionInPin extends ExecutionPin
{
  constructor() {
    super('')

    this.icon.style = `float:left; background-image: url(${require('../assets/execution-in-off.svg')});`;
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