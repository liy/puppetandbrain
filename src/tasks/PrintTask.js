import Task from './Task'

export default class PrintTask extends Task
{
  constructor(text, actor, id) {
    super(actor, id);

    this.inputs.create('text').value = text;
  }

  process() {
    // TODO: print on the actual editor console
    console.log(this.inputs.value('text'));
    return Promise.resolve()
  }

  pod() {
    return {
      ...super.pod(),
      text: this.inputs.value('text')
    }
  }

  static deserialize(data) {
    return new PrintTask(data);
  }
}