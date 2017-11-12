import Task from './Task'
import { Data } from '../Data';

export default class Call extends Task
{
  /**
   * 
   * @param {String} name Function name
   * @memberof Function
   */
  constructor() {
    super();
  }

  init(data) {
    super.init(data);

    this.inputs.add('callee', new Data(data.callee.id));
    // does not allow dynamic function call yet... Do not want to make it too complicated.
    // drop down list will do
    this.functionName = data.functionName
  }

  get callee() {
    return LookUp.get(this.inputs.value('callee'))
  }

  get function() {
    return this.callee.functions[this.functionName];
  }

  run() {
    super.run()

    this.function.run();

    this.execution.run();
  }
}