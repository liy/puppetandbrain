import Task from './Task'
import { Data } from '../Data';

export default class GroupTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);
    
    this.inputs.add('tasks', new Data([]));
  }

  add(...tasks) {
    for(let task of tasks) {
      this.inputs.value('tasks').push(task.id);
      task.parent = this;
    }
  }

  process() {
    let promises = [];
    for(let id of this.inputs.value('tasks')) {
      let task = LookUp.get(id)
      promises.push(task.run());
    }
    return Promise.all(promises);
  }
}