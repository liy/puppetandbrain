import InputList from "../data/InputList";
import OutputList from "../data/OutputList";
import Execution from "../edge/Execution";
import EventEmitter from "@/utils/EventEmitter";

export default class Node extends EventEmitter
{
  constructor(id, activity) {
    super();
    
    this.activity = activity;
    this.lookUp = this.activity.lookUp;
    this.resources = this.activity.resources;

    this.id = this.lookUp.addNode(this, id);

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
    this.lookUp.removeNode(this.id);
    // remove the node from the brain
    this.owner.brain.removeNode(this.id);
  }

  init(pod) {
    this.owner = this.lookUp.get(pod.ownerID);
    this.owner.brain.addNode(this);

    this._nodeName = pod.name || NodeTemplate[this.className].name;

    //icon
    this.iconPath = NodeTemplate[this.className].iconPath;

    // You need to do a deep copy of the pod. Since pod can be a template
    // template will be shared cross same type of nodes.
    // Simple Object.assign only copy first level property.
    // A deep copy is required!
    if(pod.memory) this.memory = JSON.parse(JSON.stringify(pod.memory));

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

  set nodeName(name) {
    this._nodeName = name;
  }

  get nodeName() {
    return this._nodeName;
  }

  get elementClass() {
    return NodeTemplate[this.className].elementClass
  }

  get brain() {
    return this.owner.brain;
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

  /**
   * Call this method to get the constructor data for initializing a gadget instance.
   * By default, it fetch the data in the memory object using input name.
   * Override this to provide more specific data, ie, dropdown list data
   * @param {*} inputName The input name
   */
  getGadgetConstructorData(inputName) {
    return this.memory[inputName];
  } 

  getUserFiles() {
    return null;
  }

  pod(detail) {
    return {
      className: this.className,
      id: this.id,
      name: this.nodeName,
      memory: this.memory,
      ownerID: this.owner.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(detail),
      x: this.x,
      y: this.y,
    }
  }
}