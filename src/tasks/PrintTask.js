import Task from './Task'
import { Accessor } from '../Data';

export default class PrintTask extends Task
{
  constructor(text, actor, id) {
    super(actor, id);

  }

  init(data) {
    super.init(data);

    this.variables.text = data.text;
    this.accessors.add('text', new Accessor('text', this));
  }

  fill(pod) {
    super.fill(pod);
  }

  process() {
    // TODO: print on the actual editor console
    console.log(this.accessors.value('text'));
    return Promise.resolve()
  }
}