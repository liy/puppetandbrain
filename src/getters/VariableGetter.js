import Getter from './Getter'

export default class VariableGetter extends Getter
{
  constructor(target, name, id) {
    super(target, name, id);
  }

  get value() {
    return this.target.variables[this.name]
  }
}