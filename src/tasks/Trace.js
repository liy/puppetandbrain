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
  
  run() {
    super.run()
    // TODO: print on the actual editor console
    console.log('%c%s', 'color: green', this.inputs.value('text')); 
    
    this.execution.run()
  }
}