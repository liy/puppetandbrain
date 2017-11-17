import DataPin from "./DataPin";

export default class OutputPin extends DataPin
{
  constructor(name) {
    super(name);

    this.icon.className += ' out-disconnected';
    this.container.style = "float:right; clear:right;"
    this.label.style = "float:right;"

    this.inputPins = [];
  }

  connect(inputPin) {
    inputPin.connect(this);
  }

  connected(inputPin) {
    if(this.inputPins.indexOf(inputPin) == -1) {
      this.inputPins.push(inputPin)
    }
    this.icon.className = 'icon out-connected';
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