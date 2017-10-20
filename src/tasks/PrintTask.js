import Task from './Task'

export default class PrintTask extends Task
{
  constructor(text) {
    super();
    this.text = text;
  }

  process() {
    // TODO: print on the actual editor console
    console.log(this.str);
    return Promise.resolve()
  }

  pod() {
    return {
      ...super.pod(),
      text: this.text
    }
  }

  static deserialize(data) {
    return new PrintTask(data.text);
  }
}