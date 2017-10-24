import Task from './Task'

/**
 * Function call task
 * 
 * @export
 * @class CallFunctionTask
 * @extends {Task}
 */
export default class CallFunctionTask extends Task
{
  constructor(data) {
    super(data);

    this.async = data.async || false;
    this.callee = data.callee;
    this.functionName = data.functionName;

    // TODO: maybe allow user to create functionn call first before actual function is created?
    // But two way of doing same thing would be more complicated to code, probably more hard for user to understand as well.
    // Better to create function in callee first, then create call task?
    // Note this is a reference of the callee's params object.
    this.params = this.callee.functions[this.functionName].params;
  }

  process() {
    if(this.callee.functions[this.functionName]) {
      if(this.async) {
        // Do not wait for other actor to complete the data
        this.callee.functions[this.functionName].run();
        return Promise.resolve();
      }
      else {
        // return a promise for run method to wait.
        return this.callee.functions[this.functionName].run();
      }
    }
  }

  pod() {
    return {
      ...super.pod(),
      callee: this.callee.id,
      functionName: this.functionName,
      async: this.async,
    }
  }

  static deserialize(data) {
    return new CallTask(data);
  }
}