import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Tween = {
  ...ParentTemplate,
  className: 'Tween',
  name: 'Move',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  inputs: [{
    name: 'position',
    type: DataType.VEC2,
  }, {
    name: 'duration',
    type: DataType.GENERIC,
  }],
  memory: {
    position: {x:0,y:0},
    duration: 1
  },
  category: 'Animation',
}

export default class Tween extends Task
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
    let pos = this.inputs.value('position');

    this.tween = TweenLite.to(this.owner, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
    this.execution.run();
  }
}