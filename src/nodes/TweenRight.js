import Task from './Task';

export default class TweenRight extends Task
{
  constructor(id) {
    super(id);

    // ensure the order
    this.execution.set('default');
    this.execution.set('completed');

    this.inputs.addInput('steps');
    this.inputs.addInput('duration');

    this.stop = this.stop.bind(this);
    Stage.on('game.stop', this.stop)
  }

  init(pod) {
    super.init(pod);

    this.variables.duration = this.variables.duration || 5
    this.variables.steps = this.variables.steps || 5
  }

  destroy() {
    super.destroy();
    Stage.off('game.stop', this.stop)
    if(this.tween) this.tween.kill()
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  get nodeName() {
    return "Move Right";
  }

  run() {
    super.run()
    let steps = this.inputs.value('steps');

    let pos = {
      x: this.owner.position.x + window.innerWidth/10 * Number(steps),
      y: this.owner.position.y
    }

    this.tween = TweenLite.to(this.owner, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}