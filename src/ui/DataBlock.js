import ExecutionInPin from "./ExecutionInPin";
import ExecutionOutPin from "./ExecutionOutPin";
import InputPin from "./InputPin";
import OutputPin from "./OutputPin";
import Block from "./Block";

// FIXME: clean up the UI!!!


export default class DataBlock extends Block
{
  constructor(model) {
    super(model)
    this.model = model;

    this.inPin = null;
    this.outPins = Object.create(null);
    this.inputPins = Object.create(null);
    this.outputPins = Object.create(null);

    this.minWidth = 200;
    this.minHeight = 60;
 
    this.dom = document.createElement('div');
    this.dom.style = `min-height:${this.minHeight}px; min-width:${this.minWidth}px; padding-bottom:5px; background:rgba(242, 245,251, 0.7); position:absolute; border-radius:10px; font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;`;

 
    let pin = new OutputPin('value');
    this.varSection.appendChild(pin.dom);
  }

  dragmove(e) {
    super.dragmove(e)

    // TODO: update connection
  }
}