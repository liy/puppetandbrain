import InputList from "../data/InputList";
import OutputList from "../data/OutputList";
import Execution from "./Execution";

export default class Node
{
  constructor(id) {
    this.id = LookUp.addNode(this, id);

    this.variables = Object.create(null);

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

    // Set the variables! I can just do normal ref assignment
    // But do a property assignment, just be safe...
    if(pod.variables) Object.assign(this.variables, pod.variables);

    // Only need the name. It will be connected once input is setup.
    for(let outputPod of pod.outputs) {
      this.outputs.addOutput(outputPod.name);
    }

    for(let pointerPod of pod.inputs) {
      let input = this.inputs.addInput(pointerPod.inputName)
      input.init(pointerPod);
    }

    this.x = pod.x;
    this.y = pod.y;
  }

  prestart() {

  }

  terminate() {
    // when game stops, make all values undefined
    this.outputs.clearValues();
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

  pod(detail=false) {
    return {
      className: this.className,
      id: this.id,
      variables: this.variables,
      owner: this.owner.id,
      inputs: this.inputs.pod(detail),
      outputs: this.outputs.pod(detail),
      x: this.x,
      y: this.y,
    }
  }
}