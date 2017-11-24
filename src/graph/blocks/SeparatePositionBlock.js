import Block from "./Block";
import InputPin from "../InputPin";

export default class SeparatePositionBlock extends Block
{
  constructor(node, graph) {
    super(node, graph);

    this.node.outputs.addOutput('x');
    this.node.outputs.addOutput('y');

    let rows = [];
    let row = (i) => {
      if(!rows[i]) {
        rows[i] = document.createElement('div');
        rows[i].className = 'row';
        this.content.appendChild(rows[i]);
      }
      return rows[i]
    }

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pin = new InputPin(this, name)
      row(i).appendChild(pin.container);
      this.inputPins.set(name, pin);
    }
  }

  dragmove(e) {
    super.dragmove(e);

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    if(this.outputPins) {
      for(let pin of this.outputPins.getValues()){
        pin.drawConnection();
      }
    }
  }
}