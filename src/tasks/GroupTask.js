import Task from './Task'

export default class GroupTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

  }

  init(data) {
    super.init(data);
    // obviously it would contains tasks id
    this.ids = this.inputs.create('tasks', []).value;
  }

  fill(pod) {
    super.fill(pod);
    this.ids = this.inputs.value('tasks');
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

  static deserialize(data) {
    let tasks = [];
    for(let taskData of data.tasks) {
      tasks.push(new taskData.class(taskData))
    }
    return new GroupTask({tasks})
  }
}