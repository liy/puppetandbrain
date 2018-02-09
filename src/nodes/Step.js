import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Step = {
  ...ParentTemplate,
  className: 'Step',
  name: 'Step',
  inputs: [{
    name: 'direction',
    descriptor: {
      type: DataType.STRING
    }
  }],
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  category: 'Animation',
  keywords: ['left', 'right', 'up', 'down', 'top', 'bottom']
}

const STEP_SIZE = 50;
const LIST = ['left', 'right', 'up', 'down'];

export default class Step extends Task
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

    this[this.inputs.value('direction')]();
    this.execution.run();
  }

  left() {
    this.tween = TweenLite.to(this.owner, 0.3, {x: this.owner.x - STEP_SIZE, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
  }

  right() {
    this.tween = TweenLite.to(this.owner, 0.3, {x: this.owner.x + STEP_SIZE, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
  }

  up() {
    this.tween = TweenLite.to(this.owner, 0.3, {y: this.owner.y + STEP_SIZE, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
  }

  down() {
    this.tween = TweenLite.to(this.owner, 0.3, {y: this.owner.y - STEP_SIZE, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
  }

  get list() {
    return LIST;
  }
}