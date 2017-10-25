import Task from './Task'
import {Data, DataType} from '../utils/DataCollection'
import DataLookUp from '../utils/DataLookUp'

/**
 * Function call task
 * 
 * @export
 * @class CallFunctionTask
 * @extends {Task}
 */
export default class CallFunctionTask extends Task
{
  constructor(actor, id) {
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
    this.inputs.add('callee', new Data(DataType.REFERENCE));
    this.inputs.add('functionName', new Data(DataType.TEXT));
    this.inputs.add('animationName', new Data(DataType.TEXT));
    this.inputs.add('async', new Data(DataType.BOOL));
    
  }

  process() {
    let callee = ActorLookUp.get(this.inputs.get('callee'));
    if(callee && callee.functions[this.inputs.get('functionName')]) {
      let funcTask = callee.functions[this.inputs.get('functionName')]
      if(this.inputs.get('async')) {
        // Do not wait for other actor to complete the data
        funcTask.run();
        return Promise.resolve();
      }
      else {
        // return a promise for run method to wait.
        return funcTask.run();
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