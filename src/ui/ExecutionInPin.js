import ExecutionPin from "./ExecutionPin";

export default class ExecutionInPin extends ExecutionPin
{
  constructor() {
    super('')

    this.spot.style = `float:left; width:17px;height:10px; background-image: url(${require('../assets/execution-in-off.svg')}); cursor:pointer;`;
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