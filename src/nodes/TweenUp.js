import Task from './Task';

export default class TweenUp extends Task
{
  constructor(id) {
    super(id);

    // ensure the order
    this.execution.set('default');
    this.execution.set('completed');

    this.stop = this.stop.bind(this);
    Stage.on('game.stop', this.stop)
  }

  init(pod) {
    super.init(pod);
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
    return "Move Up";
  }

  run() {
    super.run()

    let pos = {
      x: this.owner.position.x ,
      y: this.owner.position.y - window.innerHeight/10
    }

    this.tween = TweenLite.to(this.owner, 1, {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}