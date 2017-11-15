import DataPin from "./DataPin";

export default class OutputPin extends DataPin
{
  constructor(name) {
    super(name);

    this.container.style = "float:right; clear:right;"
    this.icon.style = `float:right; background-image: url(${require('../assets/connector-off.svg')}); cursor:pointer; margin-left:5px; margin-top:3px;`
    this.label.style = "float:right;"

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