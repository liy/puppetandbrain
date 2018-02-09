import InputList from "../data/InputList";
import OutputList from "../data/OutputList";
import Execution from "../edge/Execution";
import EventEmitter from "../utils/EventEmitter";

export default class Node extends EventEmitter
{
  constructor(id) {
    super();
    this.id = LookUp.addNode(this, id);

    // stores data used by inputs, or potential input data, e.g., node enabled, I think I can
    // either leave it as a authoring time property or make it exposed through input
    this.memory = {};

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
    this.owner = LookUp.get(pod.ownerID);
    this.owner.brain.addNode(this);

    //icon
    this.iconPath = NodeTemplate[this.className].iconPath;

    // Set the memory! I can just do normal ref assignment
    // But do a property assignment, just be safe...
    if(pod.memory) Object.assign(this.memory, pod.memory);

    // Since there are "Action" node which has dynamic ouputs
    // I cannot make input and ouput connections in initialization process
    // The data connection has to be made separately!
    //
    // we just need the name to be populated here.
    // Of course some of them will be discarded once
    // connection is setup(input is added)
    if(pod.inputs) {
      for(let inputPod of pod.inputs) {
        this.inputs.add(inputPod.name, inputPod.descriptor)
      }
    }

    if(pod.outputs) {
      // Output descriptor should already been assigned for authoring time node, such as GetPosition,
      // Loop, Break(defined in BlockBrowser), PropertySetter(defined in BlockBrowser), they should not need to include 
      // the output descriptor in the property or value assignment method call.
      // 
      // However, any dynamic node needs to assign the descriptor manually, ie, Action(it is handled in the ActionBlock)
      // 
      // VariableSetter needs to get the descriptor from the variable
      for(let outputPod of pod.outputs) {
        this.outputs.add(outputPod.name, outputPod.descriptor);
      }
    }

    this.x = pod.x;
    this.y = pod.y;
  }

  get className() {
    return this.__proto__.constructor.name;
  }

  get nodeName() {
    // default node name to be the class name
    return NodeTemplate[this.className].name || this.className;
  }

  get elementClass() {
    return NodeTemplate[this.className].elementClass
  }

  get brain() {
    return this.owner.brain;
  }

  // TODO: double check whether this works 
  copy() {
    let node = NodeFactory.create(this.className);
    node.init(this.pod())
    return node;
  }

  export(data={}) {
    data.nodes = data.nodes || [];
    data.nodes.push(this.id);

    data.store = data.store || {};
    data.store[this.id] = this.pod();

    // inputs
    for(let input of this.inputs) {
      input.export(data);
    }

    return data;
  }

  getUserFiles() {
    return null;
  }

  pod(detail) {
    return {
      className: this.className,
      id: this.id,
      memory: this.memory,
      ownerID: this.owner.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(detail),
      x: this.x,
      y: this.y,
    }
  }
}