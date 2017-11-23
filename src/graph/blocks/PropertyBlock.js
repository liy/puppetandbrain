import OutputPin from "../OutputPin";
import Block from "./Block";
import InputPin from "../InputPin";

export default class PropertyBlock extends Block
{
  constructor(node, graph) {
    super(node, graph);

    let minWidth = 200;
    let minHeight = 40;
    this.container.style.minWidth = `${minWidth}px`;
    this.container.style.minHeight = `${minHeight}px`;

    let row = document.createElement('div');
    row.className = 'row'
    this.content.appendChild(row);

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pin = new InputPin(this, name)
      row.appendChild(pin.container);
      this.inputPins.set(name, pin);
    }

    let outputPin = new OutputPin(this, this.node.name);
    row.appendChild(outputPin.container);
    this.outputPins.set(node.name, outputPin);
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