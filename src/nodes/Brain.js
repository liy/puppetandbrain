import ArrayMap from '../utils/ArrayMap';

export default class Brain
{
  constructor() {
    this.nodes = new ArrayMap();
    this.pointers = new ArrayMap();
  }

  init(pod) {
    for(let nodePod of pod.nodes) {
      let node = new NodeFactory.create(nodePod.class, nodePod.id)
      node.init(nodePod);
      this.addNode(node);
    }

    // chain the tasks
    for(let id of pod.tasks) {
      let data = pod.store[id];
      let task = LookUp.get(id);
      for(let execData of data.execution) {
        task.chain({
          name: execData.name,
          task: LookUp.get(execData.id)
        })
      }
    }

    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerData = pod.store[id];
      let inputNode = LookUp.get(pointerData.inputNode);
      let outputNode = LookUp.get(pointerData.outputNode);

      inputNode.inputs.connect(pointerData.inputName, outputNode, pointerData.outputName)
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

  addPointer(pointer) {
    this.pointers.set(pointer.id, pointer);
  }

  getPointer(id) {
    return this.pointers.get(id);
  }

  getPointers() {
    return this.pointers.getValues();
  }

  pod() {
    return {
      nodes: this.nodes.map(node => {
        return node.pod();
      }),
      pointers: this.pointers.map(pointer => {
        return pointer.pod();
      })
    }
  }
}