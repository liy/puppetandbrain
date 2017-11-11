import Task from './Task'
import {Data} from '../Data';

export default class AnimationTask extends Task
{
  constructor() {
    super();

  }

  init(data) {
    super.init(data);

    this.inputs.add('name', new Data(data.name));
  }

  process() {
    this.actor.setAnimation(this.inputs.value('name'));
    return Promise.resolve();
  }

  pod() {
    let pod = super.pod();
    pod.name = this.name;
    return pod
  }
}