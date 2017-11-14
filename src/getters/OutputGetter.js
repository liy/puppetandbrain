import Getter from './Getter'

export default class OutputGetter extends Getter
{
  constructor(task, name, id) {
    super(task, name, id);
  }

  get value() {
    return this.target.outputs.value(this.name)
  }
}