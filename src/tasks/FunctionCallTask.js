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
  constructor(target, actor, id) {
    super();
    
  }

  init(data) {
    super.init(data);
    this.inputs.create('async', true)
    this.inputs.create('target', data.target.id)
  }

  /**
   * Just a shortcut for accessing target task.
   */
  get target() {
    return LookUp.get(this.inputs.value('target'))
  }

  process() {
    if(this.inputs.value('async')) {
      // Do not wait for other actor to complete the data
      this.target.run();
      return Promise.resolve();
    }
    else {
      // return a promise for run method to wait.
      return this.target.run();
    }
  }

  static deserialize(data) {
    return new CallTask(data);
  }
}