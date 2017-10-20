import Task from './Task'

export default class GroupTask extends Task
{
  constructor(tasks=[]) {
    super();
    this.tasks = tasks;
  }

  add(...tasks) {
    for(let task of tasks) {
      task.parent = this
    }
    this.tasks.push(...tasks);
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
    return new MoveTask(LookUp.get(data.ref), data.target, data.duration);
  }
}