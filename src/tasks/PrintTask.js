import Task from './Task'

export default class PrintTask extends Task
{
  constructor(data) {
    super(data);
    this.text = data.text;
  }

  process() {
    // TODO: print on the actual editor console
    console.log(this.text);
    return Promise.resolve()
  }

  pod() {
    return {
      ...super.pod(),
      text: this.text
    }
  }

  static deserialize(data) {
    return new PrintTask(data);
  }
}