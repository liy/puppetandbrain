import Input from "../data/Input";
import Output from "../data/Output";

export default class Node
{
  constructor(id) {
    // ID will be overriden in sub classes
    this.id = id;
    // default node name to be the class name
    this.nodeName = this.__proto__.constructor.name;

    this.variables = Object.create(null);

    this.inputs = new Input(this);
    this.outputs = new Output(this);
  }

  destroy() {
    let index = this.owner.nodes.indexOf(this.id);
    if(index != -1) this.owner.nodes.splice(index, 1);
  }

  init(pod) {
    this.owner = LookUp.auto(pod.owner);
    this.owner.nodes.push(this);

    // Set the variables! I can just do normal ref assignment
    // But do a property assignment, just be safe...
    if(pod.variables) Object.assign(this.variables, pod.variables);

    // we just need the name to be populated here.
    // variable access will be auto created. 
    // Of course some of them will be discarded once 
    // connection is setup(pointer is added)
    if(pod.inputs) {
      for(let inputData of pod.inputs) {
        this.inputs.add(inputData.name);
      }
    }

    // Only need the name. Output is dynamically generated!
    if(pod.outputs) {
      for(let name of pod.outputs) {
        this.outputs.addName(name);
      }
    }
  }

  clone() {
    let ns = {
      className: this.__proto__.constructor.name
    }
    let node = new ns.className();
    node.init(this.pod());



    return node;
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      variables: this.variables,
      owner: this.owner.id,
      inputs: this.inputs.pod(),
      outputs: this.outputs.pod(),
    }
  }
}