import ExecutionInPin from "../ExecutionInPin";
import ExecutionOutPin from "../ExecutionOutPin";
import InputPin from "../InputPin";
import OutputPin from "../OutputPin";
import Block from "./Block";
import ArrayMap from "../../utils/ArrayMap";

export default class TaskBlock extends Block
{
  constructor(node, graph) {
    super(node, graph)

    this.inPin = null;
    this.outPins = new ArrayMap();

    let rows = [];
    let row = (i) => {
      if(!rows[i]) {
        rows[i] = document.createElement('div');
        rows[i].className = 'row';
        this.content.appendChild(rows[i]);
      }
      return rows[i]
    }

    // task always have at least 2 pair of exeuctions, in and out
    if(this.node.hasIn) {
      this.inPin = new ExecutionInPin(this);
      row(0).appendChild(this.inPin.container);
    }

    // out pins
    for(let i=0; i<this.node.execution.names.length; ++i) {
      let executionName = this.node.execution.names[i]
      let out = new ExecutionOutPin(this, executionName);
      row(i).appendChild(out.container)
      // TODO: to be moved to refresh
      this.outPins.set(executionName, out);
    }

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pin = new InputPin(this, name)
      row(i+1).appendChild(pin.container);
      this.inputPins.set(name, pin);
    }

    for(let i=0; i<this.node.outputs.names.length; ++i) {
      let name = this.node.outputs.names[i];
      let pin = new OutputPin(this, name);
      row(this.node.execution.names.length + i).appendChild(pin.container);
      this.outputPins.set(name, pin);
    }
  }

  delete() {
    super.delete();
    // disconnect all executions pins
    if(this.inPin) this.inPin.removeConnections();
    for(let pin of this.outPins.getValues()) {
      pin.removeConnections();
    }
  }

  refreshExecutionPins() {
    if(this.inPin) this.inPin.refresh();
    for(let pin of this.outPins.getValues()) {
      pin.refresh();
    }
  }

  dragmove(e) {
    super.dragmove(e);

    // executuion pins
    for(let pin of this.outPins.getValues()) {
      pin.drawConnection();
    }
    if(this.inPin) this.inPin.drawConnection();

    // output input pins
    for(let pin of this.inputPins.getValues()) {
      pin.drawConnection();
    }
    for(let pin of this.outputPins.getValues()){
      pin.drawConnection();
    }
  }
}