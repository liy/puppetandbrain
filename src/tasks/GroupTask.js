import Task from './Task'

export default class GroupTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    // obviously it would contains tasks id
    this.ids = this.inputs.create('tasks').value = [];
  }

  add(...tasks) {
    for(let task of tasks) {
      this.ids.push(task.id);
      task.parent = this;
    }
  }

  process() {
    let promises = [];
    for(let id of this.ids) {
      let task = LookUp.get(id)
      promises.push(task.run());
    }
    return Promise.all(promises);
  }

  pod() {
    return {
      ...super.pod(),
      tasks: this.ids
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