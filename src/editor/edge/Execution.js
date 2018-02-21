import ArrayMap from "@/utils/ArrayMap";

export default class Execution extends ArrayMap
{
  constructor(node) {
    super();

    this.names = this.keys;
    this.nodes = this.values;

    this.node = node;
  }

  connect(name, targetNode) {
    // Only be able to connect the node has enabled enter.
    if(targetNode.enter.enabled) {
      this.set(name, targetNode);
    }
    else {
      console.warn('Target node has no enter');
    }
    
    this.node.emit('execution.connected', {source:{
      name,
      node: this.node,
    }, targetNode})
  }

  disconnect(name) {
    this.set(name, null);
  }

  run(name='default') {
    if(this.nodes[name]) {
      // notify the execution run has started, useful when visualize the execution flow
      this.node.emit('execution.run', {executionName:name, targetNode: this.nodes[name]});
      this.nodes[name].run();
    }
  }

  pod() {
    return this.names.map(name => {
      return {
        name: name,
        nodeID: this.nodes[name] ? this.nodes[name].id : null
      }
    })
  }
}