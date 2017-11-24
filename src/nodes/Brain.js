import ArrayMap from '../utils/ArrayMap';
import Pointer from '../data/Pointer';
import Task from './Task';

export default class Brain
{
  constructor(owner, id) {
    this.id = LookUp.addBrain(this, id)
    this.owner = owner;
    this.nodes = new ArrayMap();
  }

  // FIXME: never used!!!!!
  init(pod) {
    // create and init nodes
    for(let id of pod.nodes) {
      let nodeData = pod.store[id];
      let node = new NodeFactory.create(nodeData.class, nodeData.id)
      node.init(nodeData);
      this.addNode(node);
    }

    // chain the tasks
    for(let id of pod.nodes) {
      let nodeData = pod.store[id];
      // Make sure the node has exeuction. It could be a data node has no exeuction
      if(nodeData.execution) {
        let task = LookUp.get(id);
        for(let execData of data.execution) {
          task.chain({
            name: execData.name,
            task: LookUp.get(execData.id)
          })
        }
      }
    }

    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerData = pod.store[id];
      let inputNode = LookUp.get(pointerData.inputNode);
      let outputNode = LookUp.get(pointerData.outputNode);
      new Pointer(inputNode, pointerData.inputName, outputNode, pointerData.outputName, id)
    }
  }

  destroy() {
    LookUp.removeBrain(this.id);
    let nodes = this.nodes.getValues().concat();
    for(let node of nodes) {
      node.destroy();
    }
  }

  addNode(node) {
    this.nodes.set(node.id, node);
  }

  createNode(nodeName, pod) {
    let node = new NodeFactory.create(nodeName);
    node.init(pod);
    this.nodes.set(node.id, node);

    return node;
  }

  removeNode(id) {
    this.nodes.remove(id);
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  getNodes() {
    return this.nodes.getValues();
  }

  getPointers() {
    let nodes = this.nodes.getValues();
    let pointers = [];
    for(let node of nodes) {
      for(let name of node.inputs.names) {
        let pointer = node.inputs.get(name);
        if(pointer.isOutputPointer) pointers.push(pointer); 
      }
    }
    return pointers;
  }

  getTasks() {
    return this.getNodes().filter(node => {
      return node instanceof Task;
    })
  }

  pod() {
    return {
      className: this.__proto__.constructor.name,
      nodes: this.nodes.getKeys().concat(),
      owner: this.owner.id,
    }
  }
}