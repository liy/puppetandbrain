import Task from './Task';

export default class Tween extends Task
{
  constructor(id) {
    super(id);

    this.nodeName = "Move"

    // ensure the order
    this.execution.set('default');
    this.execution.set('complete');

    this.inputs.add('duration');
    this.inputs.add('position');
  }

  init(pod) {
    super.init(pod);

    this.variables.duration = this.variables.duration || 1
    this.variables.position = this.variables.position || {
      x: this.actor.x+100, 
      y: this.actor.y
    }
  }

  run() {
    super.run()
    let pos = this.inputs.value('position');
    TweenLite.to(this.actor, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('complete');
    }});
    this.execution.run();
  }
}