import Task from './Task';

export default class DelayTask extends Task
{
  constructor(seconds, actor, id) {
    super();
  }

  init(data) {
    super.init(data);
    this.inputs.create('seconds', data.seconds);
  }
  
  process() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, this.inputs.value('seconds')*1000)
    });
  }
}