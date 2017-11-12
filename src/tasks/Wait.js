import Task from './Task';
import { Data } from '../Data';

export default class Wait extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);
    
    this.inputs.add('seconds', new Data(data.seconds));
  }
  
  run() {
    super.run()
    setTimeout(() => {
      this.execution.run();
    }, this.inputs.value('seconds')*1000);
  }
}