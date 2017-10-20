import Task from './Task';
import LookUp from '../objects/LookUp'

export default class DelayTask extends Task
{
  constructor(miniseconds) {
    super();
    this.miniseconds = miniseconds;
  }

  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.miniseconds)
    });
  }

  serialize() {
    return JSON.stringify({
      class: 'Delay',
      miniseconds: this.miniseconds
    })
  }

  static deserialize(data) {
    return new Delay(data.miniseconds);
  }
}