import Task from './Task';

export default class Tween extends Task
{
  constructor(id) {
    super(id);

    // ensure the order
    this.execution.set('default');
    this.execution.set('complete');
  }

  init(pod) {
    super.init(pod);

    this.variables.duration = this.variables.duration || 1
    this.variables.position = this.variables.position || {
      x: this.owner.x+100,
      y: this.owner.y
    }
  }

  destroy() {
    super.destroy();
    if(this.tween) this.tween.kill()
  }

  terminate() {
    super.terminate();
    if(this.tween) this.tween.kill()
  }

  get nodeName() {
    return "Move";
  }

  run() {
    super.run()
    let pos = this.inputs.value('position');
    this.tween = TweenLite.to(this.owner, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('complete');
    }});
    this.execution.run();
  }
}