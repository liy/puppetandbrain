/**
 * Variable pointer does not needs to be serialized.
 * It just provide a generic way to obtain particular value
 * 
 * @export
 * @class VariableAccessor
 */
export default class VariableAccessor
{
  constructor(node, name) {
    this.node = node;
    this.name = name;
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