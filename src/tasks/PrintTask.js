import Task from './Task'

export default class PrintTask extends Task
{
  constructor(text, actor, id) {
    super(actor, id);

  }

  init(data) {
    super.init(data);
    this.inputs.create('text', data.text);
  }

  fill(pod) {
    super.fill(pod);
  }

  process() {
    // TODO: print on the actual editor console
    console.log(this.inputs.value('text'));
    return Promise.resolve()
  }
}