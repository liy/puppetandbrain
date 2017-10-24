import Task from './Task'

export default class GroupTask extends Task
{
  constructor(data={}) {
    super(data);
    this.tasks = data.tasks || [];
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