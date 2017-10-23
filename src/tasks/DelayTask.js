import Task from './Task';

export default class DelayTask extends Task
{
  constructor(data) {
    super(data);
    this.miniseconds = data.miniseconds;
  }

  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.miniseconds)
    });
  }

  pod() {
    return {
      ...super.pod(),
      miniseconds: this.miniseconds,
    }
  }

  static deserialize(data) {
    return new Delay(data);
  }
}