import InputList from "../data/InputList";
import OutputList from "../data/OutputList";
import Execution from "./Execution";
import EventEmitter from "../utils/EventEmitter";

export default class Node extends EventEmitter
{
  constructor(id) {
    super();
    this.id = LookUp.addNode(this, id);

    // this.variables = Object.create(null);
    this.variables = {};

    this.inputs = new InputList(this);
    this.outputs = new OutputList(this);

    // Not sure whether it is a good idea to record block position here.
    // It might make sense... node still need a position
    this.x = 0;
    this.y = 0;
  }

  destroy() {
    this.inputs.destroy();
    this.outputs.destroy();
    LookUp.removeNode(this.id);
    // remove the node from the brain
    this.owner.brain.removeNode(this.id);
  }

  init(pod) {
    this.owner = LookUp.auto(pod.owner);
    this.owner.brain.addNode(this);

    // read and setup in, out, inputs and outputs from template
    this.mold();

    // Set the variables! I can just do normal ref assignment
    // But do a property assignment, just be safe...
    if(pod.variables) Object.assign(this.variables, pod.variables);

    // Since there are "Action" node which has dynamic ouputs
    // I cannot make input and ouput connections in initialization process
    // The data connection has to be made separately!
    //
    // we just need the name to be populated here.
    // variable access will be auto created.
    // Of course some of them will be discarded once
    // connection is setup(pointer is added)
    if(pod.inputs) {
      for(let pointerPod of pod.inputs) {
        this.inputs.addInput(pointerPod.inputName)
      }
    }

    if(pod.outputs) {
      for(let outputPod of pod.outputs) {
        this.outputs.addOutput(outputPod.name);
      }
    }

    this.x = pod.x;
    this.y = pod.y;
  }

  mold() {
    if(NodeTemplate[this.className]) {
      if(NodeTemplate[this.className].input) {
        for(let input of NodeTemplate[this.className].input) {
          this.inputs.addInput(input.name)
        }
      }

      if(NodeTemplate[this.className].output) {
        for(let output of NodeTemplate[this.className].output) {
          this.outputs.addOutput(output.name)
        }
      }
    }
  }

  get className() {
    return this.__proto__.constructor.name;
  }

  get nodeName() {
    // default node name to be the class name
    return this.className;
  }

  get brain() {
    return this.owner.brain;
  }

  /**
   * Does not copy the variable and execution connections
   */
  copy() {
    let node = NodeFactory.create(this.className);
    node.init(this.pod())
    return node;
  }

  pod(detail) {
    return {
      className: this.className,
      id: this.id,
      variables: this.variables,
      owner: this.owner.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(detail),
      x: this.x,
      y: this.y,
    }
  }
}