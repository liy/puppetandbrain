import ArrayMap from "../utils/ArrayMap";

export default class
{
  constructor(node, name='default') {
    this.node = node;
    this.name = name;

    this.links = new ArrayMap();
  }

  connect(node, executionName) {
    this.links.set(`${node.id}.${executionName}`, {
      node: node.id,
      name: executionName
    })
  }

  disconnect(node, executionName) {
    this.links.remove(`${node.id}.${executionName}`);
  }

  pod() {
    return {
      name: this.name,
      node: this.node.id,
      links: this.links.values.map(link => {
        return {
          node: link.node,
          name: link.name
        }
      })
    }
  }
}