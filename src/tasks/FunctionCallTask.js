import Task from './Task'

/**
 * Function call task
 * 
 * @export
 * @class FunctionCallTask
 * @extends {Task}
 */
export default class FunctionCallTask extends Task
{
  constructor(functionTask, actor, id) {
    super(actor, id);
    
    this.inputs.create('async').value = true;
    this.functionTask = functionTask;
  }

  process() {
    if(this.inputs.value('async')) {
      // Do not wait for other actor to complete the data
      this.functionTask.run();
      return Promise.resolve();
    }
    else {
      // return a promise for run method to wait.
      return this.functionTask.run();
    }
  }

  pod() {
    return {
      ...super.pod(),
      functionTask: this.functionTask.id,
      async: this.inputs.value('async'),
    }
  }

  static deserialize(data) {
    return new CallTask(data);
  }
}