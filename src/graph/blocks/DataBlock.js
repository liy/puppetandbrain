import InputPin from "../InputPin";
import OutputPin from "../OutputPin";
import Block from "./Block";

export default class DataBlock extends Block
{
  constructor(node) {
    super(node)

    this.minWidth = 100;

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pin = new InputPin(this, name)
      this.getRow(i).appendChild(pin.container);
      this.inputPins.set(name, pin);
    }

    for(let i=0; i<this.node.outputs.names.length; ++i) {
      let name = this.node.outputs.names[i];
      let pin = new OutputPin(this, name);
      this.getRow(i).appendChild(pin.container);
      this.outputPins.set(name, pin);
    }
  }

  dragmove(e) {
    super.dragmove(e);

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    for(let pin of this.outputPins.getValues()){
      pin.drawConnection();
    }
  }
}