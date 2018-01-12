import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Tween = {
  ...ParentTemplate,
  name: 'Move',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  inputs: [{
    inputName: 'position',
    type: DataType.VEC2,
  }, {
    inputName: 'duration',
    type: DataType.GENERIC,
  }]
}

export default class Tween extends Task
{
  constructor(id) {
    super(id);

    this.stop = this.stop.bind(this);
    Stage.on('game.stop', this.stop)
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
    Stage.off('game.stop', this.stop)
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