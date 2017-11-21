import ArrayMap from '../utils/ArrayMap';
import Pointer from '../data/Pointer';
import BrainGraph from '../graph/BrainGraph';
import Task from './Task';

export default class Brain
{
  constructor(owner, id) {
    this.id = LookUp.addBrain(this, id)
    this.owner = owner;

    this.nodes = new ArrayMap();
    this.pointers = new ArrayMap();

    this.openBrainGraph = this.openBrainGraph.bind(this);
    this.owner.on('brain.open', this.openBrainGraph);
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

  destroy() {
    this.owner.off('brain.open', this.openBrainGraph);
    LookUp.removeBrain(this.id)
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

  getTasks() {
    return this.getNodes().filter(node => {
      return node instanceof Task;
    })
  }

  connectVariable(inputNode, inputName, outputNode, outputName, id) {
    // remove pointer from old output node of the target input node
    let oldPointer = inputNode.inputs.get(inputName);
    if(oldPointer.outputNode) oldPointer.outputNode.outputs.disconnected(oldPointer);
    // destroy old pointer
    this.pointers.remove(oldPointer.id);
    oldPointer.destroy()

    let pointer = new Pointer(inputNode, inputName, outputNode, outputName, id);
    this.pointers.set(pointer.id, pointer);
    // Make new connection
    inputNode.inputs.connected(pointer);
    outputNode.outputs.connected(pointer);
  }

  disconnectVariable(pointer) {
    if(pointer.isLocalPointer) return;

    pointer.inputNode.inputs.disconnect(pointer.inputName);
    pointer.outputNode.outputs.disconnected(pointer);

    this.pointers.remove(pointer.id);
    pointer.destroy();
  }

  openBrainGraph(e) {
    this.graph = new BrainGraph(this.owner);
    this.graph.init()
    this.graph.open();
  }

  pod() {
    return {
      className: this.__proto__.constructor.name,
      nodes: this.nodes.getKeys().concat(),
      owner: this.owner.id,
      pointers: this.pointers.getKeys().concat()
    }
  }
}