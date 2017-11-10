import Task from './Task'
import { Accessor } from '../Data';

export default class GroupTask extends Task
{
  constructor() {
    super();
  }

  init(data) {
    super.init(data);
    
    this.variables.tasks = [];
    this.accessors.add('tasks', new Accessor('tasks', this));
  }

  add(...tasks) {
    for(let task of tasks) {
      this.accessors.value('tasks').push(task.id);
      task.parent = this;
    }
  }

  process() {
    let promises = [];
    for(let id of this.accessors.value('tasks')) {
      let task = LookUp.get(id)
      promises.push(task.run());
    }
    return Promise.all(promises);
  }
}