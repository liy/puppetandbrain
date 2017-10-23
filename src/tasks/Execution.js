export default class Execution
{
  constructor() {
    this.options = [];
  }

  add(name, task) {
    this.options.push({
      name,
      task
    })
  }

  remove(index) {
    this.options.splice(index, 1);
  }

  get default() {
    return this.options[0] ? this.options[0].task : null;
  }

  set default(task) {
    this.options[0] = {
      name: 'default',
      task: task 
    }
  }

  pod() {
    let ids = [];
    for(let option of this.options) {
      ids.push(option.task.id)
    }
    return ids
  }
}