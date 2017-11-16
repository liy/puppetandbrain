export default class Variable
{
  constructor(node, name) {
    this.id = LookUp.addVariable(this)
    this.node = node;
    this.name = name;
  }

  destroy() {
    LookUp.removeVariable(this.id);
  }

  get value() {
    return this.node.variables[this.name]
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