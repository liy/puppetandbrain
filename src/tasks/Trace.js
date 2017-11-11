import Task from './Task'
import { Data } from '../Data';

export default class Trace extends Task
{
  constructor() {
    super();

  }

  init(data) {
    super.init(data);

    this.inputs.add('text', new Data(data.text));
  }
  
  process() {
    // TODO: print on the actual editor console
    console.log(this.inputs.value('text'));
    return Promise.resolve()
  }
}