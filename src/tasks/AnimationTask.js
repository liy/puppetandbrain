import Task from './Task'
import {Accessor} from '../Data';

export default class AnimationTask extends Task
{
  constructor() {
    super();

  }

  init(data) {
    super.init(data);

    this.variables.name = data.name
    this.accessors.add('name', new Accessor('name', this));
  }

  process() {
    this.actor.setAnimation(this.accessors.value('name'));
    return Promise.resolve();
  }

  pod() {
    let pod = super.pod();
    pod.name = this.name;
    return pod
  }
}