import ArrayMap from '../utils/ArrayMap';
import Pointer from '../data/Pointer';
import BrainGraph from '../graph/BrainGraph';
import Stage from '../objects/Stage'
import Task from './Task';

export default class Brain
{
  constructor(owner, id) {
    this.id = LookUp.addBrain(this, id)
    this.owner = owner;

    this.nodes = new ArrayMap();
    this.pointers = new ArrayMap();

    this.open = this.open.bind(this);
    this.owner.on('brain.open', this.open);

    this.close = this.close.bind(this);
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
    this.owner.off('brain.open', this.open);
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

  open(e) {
    this.graph = new BrainGraph(this.owner);
    this.graph.init()
    Stage.blurEnabled = true;

    document.addEventListener('keydown', this.close)
  }

  close(e) {
    // TODO: find a better way to close brain!
    // escape
    if(e.keyCode == 27) {
      this.graph.destroy();
      Stage.blurEnabled = false;
      document.removeEventListener('keydown', this.close)
    }
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