import {toRadian} from '../utils/utils';
import {Task, Template as ParentTemplate} from './Task';

NodeTemplate.RotateAntiClockwise = {
  ...ParentTemplate,
  name: 'Rotate Anticlockwise',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  category: 'Animation',
  keywords: ['rotate', 'rotation', 'aniti clockwise']
}

export default class RotateAntiClockwise extends Task
{
  constructor(id) {
    super(id);

    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    Editor.off('game.stop', this.stop, this)
    if(this.tween) this.tween.kill()
  }

  stop() {
    if(this.tween) this.tween.kill()
  }

  run() {
    super.run()

    let r = 10 * toRadian;

    this.tween = TweenLite.to(this.owner, 0.2, {rotation: this.owner.rotation-r, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}