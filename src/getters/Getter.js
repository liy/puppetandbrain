export default class Getter
{
  constructor(node, name, id) {
    this.id = LookUp.addGetter(this, id);
    this.node = node;
    this.name = name;
  }

  get value() {
    return this.node[this.name];
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      node: this.node.id,
      name: this.name,
    }
  }
}