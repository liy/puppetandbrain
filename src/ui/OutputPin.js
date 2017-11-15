import DataPin from "./DataPin";

export default class OutputPin extends DataPin
{
  constructor(name) {
    super(name);

    this.container.style = "float:right; clear:right; font-size:12px;"
    this.pin.style = `float:right; width:11px; height:11px; background-image: url(${require('../assets/connector.svg')}); cursor:pointer;`
    this.label.style = "float:right; user-select:none; cursor:default"

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