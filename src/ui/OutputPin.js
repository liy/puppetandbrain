import DataPin from "./DataPin";

export default class OutputPin extends DataPin
{
  constructor(name) {
    super(name, 'output');

    this.inputPins = [];
  }

  connect(inputPin) {
    inputPin.connect(this);
  }

  get isConnected() {
    return this.inputPins.length != 0
  }

  drawConnection() {
    for(let inputPin of this.inputPins) {
      inputPin.drawConnection();
    }
  }
}