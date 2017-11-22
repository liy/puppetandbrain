import Input from "../data/Input";
import Output from "../data/Output";
import Execution from "./Execution";

export default class Node
{
  constructor(id) {
    this.id = LookUp.addNode(this, id);

    this.variables = Object.create(null);

    this.inputs = new Input(this);
    this.outputs = new Output(this);

    // Not sure whether it is a good idea to record block position here.
    // It might make sense... node still need a position
    this.x = 0;
    this.y = 0;
  }

  destroy() {
    this.inputs.destroy();
    this.outputs.destroy();
    LookUp.removeNode(this.id);
  }

  init(pod) {
    this.owner = LookUp.auto(pod.owner);
    this.owner.brain.addNode(this);

    // Set the variables! I can just do normal ref assignment
    // But do a property assignment, just be safe...
    if(pod.variables) Object.assign(this.variables, pod.variables);

    // we just need the name to be populated here.
    // variable access will be auto created.
    // Of course some of them will be discarded once
    // connection is setup(pointer is added)
    if(pod.inputs) {
      for(let inputData of pod.inputs) {
        this.inputs.addName(inputData.name);
      }
    }

    // Only need the name. Output is dynamically generated!
    if(pod.outputs) {
      for(let name of pod.outputs) {
        this.outputs.addName(name);
      }
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

  pod() {
    return {
      className: this.className,
      id: this.id,
      variables: this.variables,
      owner: this.owner.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(),
      x: this.x,
      y: this.y,
    }
  }
}