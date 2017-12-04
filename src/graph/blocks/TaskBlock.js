import ExecutionInPin from "../ExecutionInPin";
import ExecutionOutPin from "../ExecutionOutPin";
import InputPin from "../InputPin";
import OutputPin from "../OutputPin";
import Block from "./Block";
import ArrayMap from "../../utils/ArrayMap";

export default class TaskBlock extends Block
{
  constructor(node) {
    super(node)

    this.minWidth = 120;

    // task always have at least 2 pair of exeuctions, in and out
    if(this.node.hasIn) {
      this.inPin = new ExecutionInPin(this);
      this.getRow(0).appendChild(this.inPin.container);
    }

    // out pins
    this.outPins = new ArrayMap();
    for(let i=0; i<this.node.execution.names.length; ++i) {
      let executionName = this.node.execution.names[i]
      let out = new ExecutionOutPin(this, executionName);
      this.getRow(i).appendChild(out.container)
      this.outPins.set(executionName, out);
    }

    for(let i=0; i<this.node.inputs.names.length; ++i) {
      let name = this.node.inputs.names[i];
      let pin = new InputPin(this, name)
      this.getRow(i+1).appendChild(pin.container);
      this.inputPins.set(name, pin);
    }

    for(let i=0; i<this.node.outputs.names.length; ++i) {
      let name = this.node.outputs.names[i];
      let pin = new OutputPin(this, name);
      this.getRow(this.node.execution.names.length + i).appendChild(pin.container);
      this.outputPins.set(name, pin);
    }

    this.node.on('task.start', task => {
      this.content.classList.add('run');
      setTimeout(() => {
        this.content.classList.remove('run');
      }, 500);
    })
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