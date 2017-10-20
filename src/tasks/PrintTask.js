import Task from './Task'

export default class PrintTask extends Task
{
  constructor(str) {
    super();
    this.str = str;
  }

  process() {
    console.log(this.str, this.id);
    return Promise.resolve()
  }
}