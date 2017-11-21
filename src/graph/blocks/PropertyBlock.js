import OutputPin from "../OutputPin";
import Block from "./Block";
import InputPin from "../InputPin";

export default class PropertyBlock extends Block
{
  constructor(node, graph) {
    super(node, graph);

    let minWidth = 200;
    let minHeight = 40;
    this.container.style = `min-height:${minHeight}px; min-width:${minWidth}px;`;

    let row = document.createElement('div');
    row.className = 'row'
    this.content.appendChild(row);

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pin = new InputPin(this, name)
      row.appendChild(pin.container);
      this.inputPins.set(name, pin);
    }

    this.outputPin = new OutputPin(this, this.node.name);
    row.appendChild(this.outputPin.container);
    this.outputPins.set(node.name, this.outputPin);
  }

  dragmove(e) {
    super.dragmove(e);

    this.outputPin.drawConnection();
  }
}