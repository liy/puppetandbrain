import Task from './Task'
import {Data, DataType} from '../utils/DataCollection'

export default class PrintTask extends Task
{
  constructor(data) {
    super(data);

    this.inputs.add('text', new Data(DataType.TEXT, ''))
  }

  process() {
    // TODO: print on the actual editor console
    console.log(this.inputs.get('text'));
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