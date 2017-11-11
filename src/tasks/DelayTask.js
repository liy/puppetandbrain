import Task from './Task';
import { Data } from '../Data';

export default class DelayTask extends Task
{
  constructor(seconds, actor, id) {
    super();
  }

  init(data) {
    super.init(data);
    
    this.inputs.add('seconds', new Data(data.seconds));
  }
  
  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.inputs.value('seconds')*1000)
    });
  }
}