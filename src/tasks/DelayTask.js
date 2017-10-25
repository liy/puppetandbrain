import Task from './Task';
import {Data, DataType} from '../utils/DataCollection'

export default class DelayTask extends Task
{
  constructor(actor, id) {
    super(actor, id);
    this.inputs.add('seconds', new Data(DataType.NUMBER, 1));
  }

  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.inputs.get('seconds'))
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