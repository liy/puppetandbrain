import utils from '../utils/utils';
import {Task, Template as TaskTemplate} from './Task';

NodeTemplate.RotateAntiClockwise = {
  ...TaskTemplate,
  name: 'Rotate Anticlockwise',
  out: ['default', 'completed']
}

export default class RotateAntiClockwise extends Task
{
  constructor(id) {
    super(id);

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
    return "Rotate Anticlockwise";
  }

  run() {
    super.run()

    let r = 10 * utils.toRadian;

    this.tween = TweenLite.to(this.owner, 0.2, {rotation: this.owner.rotation-r, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}