export default class Execution
{
  constructor() {
    this.options = Object.create(null);
    this.nameList = [];
  }

  set(name, task=null) {
    // execution names have order.
    // So only queue the name for the first time.
    if(this.nameList.indexOf(name) == -1) {
      this.nameList.push(name)
    }
    this.options[name] = task;
  }

  remove(name) {
    delete this.options[name];
    this.nameList.splice(name, 1);
  }
  
  get(name) {
    return this.options[name];
  }

  run(name='default') {
    if(this.options[name]) {
      this.options[name].run();
    }
  }

  pod() {
    let executions = [];
    for(let name of this.nameList) {
      let data = {
        name
      }
      if(this.options[name]) {
        data.id = this.options[name].id
      }
      executions.push(data)
    }
    return executions
  }
}