import Task from './Task';
import { Accessor } from '../Data';

export default class DelayTask extends Task
{
  constructor(seconds, actor, id) {
    super();
  }

  init(data) {
    super.init(data);
    
    this.seconds = data.seconds
    this.accessors.add('seconds', new Accessor('seconds', this));
  }
  
  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.accessors.value('seconds')*1000)
    });
  }
}