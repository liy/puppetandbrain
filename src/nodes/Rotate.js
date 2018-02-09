import {toRadian} from '../utils/utils';
import {Task, Template as ParentTemplate} from './Task';
import DataType from '../data/DataType';

NodeTemplate.Rotate = {
  ...ParentTemplate,
  className: 'Rotate',
  name: 'Rotate',
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
  keywords: ['rotate', 'rotation', 'clockwise', 'anti-clockwise', 'anticlockwise']
}

const STEP_SIZE = 10*toRadian;
const LIST = ['clockwise', 'anticlockwise'];

export default class Rotate extends Task
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

  clockwise() {
    this.tween = TweenLite.to(this.owner, 0.2, {rotation: this.owner.rotation+STEP_SIZE, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
  }

  anticlockwise() {
    this.tween = TweenLite.to(this.owner, 0.2, {rotation: this.owner.rotation-STEP_SIZE, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('completed');
    }});
  }

  get list() {
    return LIST;
  }
}