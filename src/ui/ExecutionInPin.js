import ExecutionPin from "./ExecutionPin";

export default class ExecutionInPin extends ExecutionPin
{
  constructor() {
    super('', 'left')

    this.connectedPin = null
  }

  draw() {
    if(this.connectedPin) {
      this.connectedPin.draw();
    }
  }
}