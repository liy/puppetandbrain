import Getter from './Getter'

export default class VariableGetter extends Getter
{
  constructor(node, name, id) {
    super(node, name, id);
  }

  get value() {
    return this.node.variables[this.name]
  }
}