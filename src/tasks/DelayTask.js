import Task from './Task';

export default class DelayTask extends Task
{
  constructor(seconds, actor, id) {
    super(actor, id);

    this.inputs.create('seconds').value = seconds;
  }

  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.inputs.value('seconds'))
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