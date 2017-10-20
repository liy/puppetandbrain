import Task from './Task'

export default class GroupTask extends Task
{
  constructor(tasks=[]) {
    super();
    this.tasks = tasks;
  }

  process() {
    let promises = [];
    for(let task of this.tasks) {
      promises.push(task.run());
    }
    return Promise.all(promises);
  }
}