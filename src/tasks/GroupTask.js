import Task from './Task'

export default class GroupTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    this.properties = {
      tasks: []
    }
  }

  
  fill(pod) {
    super.fill(pod);
    this.properties.tasks = this.inputs.value('tasks');
  }

  add(...tasks) {
    for(let task of tasks) {
      this.properties.tasks.push(task.id);
      task.parent = this;
    }
  }

  process() {
    let promises = [];
    for(let id of this.properties.tasks) {
      let task = LookUp.get(id)
      promises.push(task.run());
    }
    return Promise.all(promises);
  }

  static deserialize(data) {
    let tasks = [];
    for(let taskData of data.tasks) {
      tasks.push(new taskData.class(taskData))
    }
    return new GroupTask({tasks})
  }
}