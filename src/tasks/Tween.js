import Task from './Task';
import { Data } from '../Data';

export default class Tween extends Task
{
  constructor() {
    super();

    // ensure the order
    this.execution.set('default');
    this.execution.set('complete');
  }

  init(data) {
    super.init(data);

    this.inputs.add('duration', new Data(data.duration || 1));
    this.inputs.add('position', new Data(data.position || {
      x: this.actor.x+100, 
      y: this.actor.y
    }));
  }

  run() {
    super.run()
    let pos = this.inputs.value('position');
    TweenLite.to(this.actor, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: () => {
      this.execution.run('complete');
    }});
    this.execution.run();
  }

  // async run() {
  //   console.log('run', this)
  //   await this.process();
  //   this.emit('task.complete') 
  //   return this.execution.complete
  // }

  // process() {

  //   let pos = this.inputs.value('position');
  //   let completePromise = new Promise(resolve => {
  //     TweenLite.to(this.actor, this.inputs.value('duration'), {x: pos.x, y: pos.y, ease:Linear.easeNone, onComplete: resolve});

  //     // continue normal execution
  //     this.execution.default ? this.execution.default.run() : Promise.resolve();
  //   })

  //   return completePromise;
  // }
}