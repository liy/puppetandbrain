import ArrayMap from "../utils/ArrayMap";

export default class Execution extends ArrayMap
{
  constructor() {
    super();

    this.names = this.keys;
    this.nodes = this.values;
  }

  connect(name, node) {
    // Only be able to connect the node has enabled enter.
    if(node.enter.enabled) {
      this.set(name, node);
    }
    else {
      console.warn('Target node has no enter');
    }
  }

  disconnect(name) {
    this.set(name, null);
  }

  run(name='default') {
    if(this.nodes[name]) {
      this.nodes[name].run();
    }
  }

  pod() {
    return this.keys.map(name => {
      return {
        name: name,
        nodeID: this.nodes[name] ? this.nodes[name].id : null
      }
    })
  }
}