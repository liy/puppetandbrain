import Command from './Command';
import LookUp from '../objects/LookUp'

export default class Delay extends Command
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
      miniseconds: this.miniseconds,
      tid: this.target ? this.target.id : undefined
    })
  }

  static deserialize(data) {
    return new Delay(LookUp.get(data.tid), data.miniseconds);
  }
}