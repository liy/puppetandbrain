import Task from './Task';

export default class MoveTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

    this.inputs.create('position').value = {x:actor.x+100,y:actor.y};
    this.inputs.create('duration').value = 1;
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.actor, this.inputs.value('duration'), {...this.inputs.value('position'), onComplete: resolve});
    })
  }

  pod() {
    return {
      ...super.pod(),
      inputs: {
        position: this.inputs.value('position'),
        duration: this.inputs.value('duration')
      }
    }
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}