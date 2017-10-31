import Task from './Task';

export default class MoveTask extends Task
{
  constructor(actor, id) {
    super(actor, id);

  }

  init(data) {
    super.init(data);
    this.inputs.create('position', data.position || {x:this.actor.x+100,y:this.actor.y});
    this.inputs.create('duration', data.duration || 1);
  }

  process() {
    return new Promise(resolve => {
      TweenLite.to(this.actor, this.inputs.value('duration'), {...this.inputs.value('position'), onComplete: resolve});
    })
  }

  static deserialize(data) {
    return new MoveTask(data);
  }
}