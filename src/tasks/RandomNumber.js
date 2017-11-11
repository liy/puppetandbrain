import Task from './Task'
import { Data } from '../Data';

export default class RandomNumber extends Task
{
  constructor() {
    super();
  }
  
  init(data) {
    super.init(data);

    this.outputs.add('random', new Data(Math.random()));
  }

  run() {
    this.outputs.update('random', Math.random());
    return this.execution.default.run();
  }
}