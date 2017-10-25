import Task from './Task'
import {Data, DataType} from '../utils/DataCollection'

export default class GroupTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    this.tasks = this.inputs.add('tasks', new Data(DataType.ARRAY, [])).value;
  }

  add(...tasks) {
    this.tasks.push(...tasks);
    for(let task of this.tasks) {
      task.parent = this;
    }
  }

  process() {
    let promises = [];
    for(let task of this.tasks) {
      promises.push(task.run());
    }
    return Promise.all(promises);
  }

  pod() {
    return {
      ...super.pod(),
      tasks: this.tasks.map(task => {
        return task.pod()
      })
    }
  }

  static deserialize(data) {
    let tasks = [];
    for(let taskData of data.tasks) {
      tasks.push(new taskData.class(taskData))
    }
    return new GroupTask({tasks})
  }
}