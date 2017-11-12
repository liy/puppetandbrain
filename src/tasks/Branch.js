import Task from "./Task";
import { Data } from "../Data";

export default class Branch extends Task
{
  constructor() {
    super();
    
    this.execution.set('true')
    this.execution.set('false')
  }

  init(data) {
    super.init(data);
    
    this.inputs.add('condition', new Data(true));
  }

  run() {
    if(this.inputs.value('condition')) {
      this.execution.run('true')
    }
    else {
      this.execution.run('false');
    }
  }
}