import Task from './Task'
import {Data} from '../Data';

export default class Animation extends Task
{
  constructor() {
    super();

  }

  init(data) {
    super.init(data);

    this.inputs.add('name', new Data(data.name));
  }

  run() {
    super.run()
    this.actor.setAnimation(this.inputs.value('name'));
    this.execution.run();
  }

  pod() {
    let pod = super.pod();
    pod.name = this.name;
    return pod
  }
}