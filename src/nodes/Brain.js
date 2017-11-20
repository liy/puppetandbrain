import ArrayMap from '../utils/ArrayMap';
import Pointer from '../data/Pointer';

export default class Brain
{
  constructor(id) {
    this.id = LookUp.addBrain(this, id)

    this.nodes = new ArrayMap();
    this.pointers = new ArrayMap();
  }

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

  addNode(node) {
    this.nodes.set(node.id, node);
  }

  createNode(nodeName, pod) {
    let node = new NodeFactory.create(nodeName);
    node.init(pod);
    this.nodes.set(node.id, node);

    return node;
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  getNodes() {
    return this.nodes.getValues();
  }

  getPointer(id) {
    return this.pointers.get(id);
  }

  getPointers() {
    return this.pointers.getValues();
  }

  connectVariable(inputNode, inputName, outputNode, outputName, id) {
    let pointer = new Pointer(inputNode, inputName, outputNode, outputName, id);
    this.pointers.set(pointer.id, pointer);
    inputNode.inputs.connected(pointer);
    outputNode.outputs.connected(pointer);
  }

  disconnectVariable(inputNode, inputName, outputNode, outputName) {
    let pointer = inputNode.get(inputName);
    this.pointers.remove(pointer.id);
    inputNode.inputs.disconnected(inputName);
    outputNode.outputs.disconnected(outputName);
  }

  pod() {
    return {
      nodes: this.nodes.getKeys().concat(),
      pointers: this.pointers.getKeys().concat()
    }
  }
}