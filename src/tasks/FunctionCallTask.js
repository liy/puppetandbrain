import Task from './Task'
import DataLookUp from '../utils/DataLookUp'

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

    // this.async = data.async || false;
    // this.callee = data.callee;
    // this.functionName = data.functionName;

    // // TODO: maybe allow user to create functionn call first before actual function is created?
    // // But two way of doing same thing would be more complicated to code, probably more hard for user to understand as well.
    // // Better to create function in callee first, then create call task?
    // // Note this is a reference of the callee's params object.
    // this.params = this.callee.functions[this.functionName].params;

    // this.inputs = {
    //   callee: 0,
    //   functioName: 0,
    //   async: 0
    // }
    
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
      async: this.async,
    }
  }

  static deserialize(data) {
    return new CallTask(data);
  }
}