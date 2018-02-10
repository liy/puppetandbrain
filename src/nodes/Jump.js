import {Task, Template as ParentTemplate} from "./Task";
import DataType from "../data/DataType";

NodeTemplate.Jump = {
  ...ParentTemplate,
  name: 'Jump',
  className: 'Jump',
  execution: [{
    name: 'default'
  }, {
    name: 'completed'
  }],
  inputs: [{
    name: 'height',
    descriptor: {
      type: DataType.DOUBLE
    }
  }, {
    name: 'duration',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    height: 20,
    duration: 2,
  },
  category: 'Animation',
  keywords: ['jump']
}

export default class Jump extends Task
{
  constructor(id) {
    super(id);

    Editor.on('game.start', this.start, this)
    Editor.on('game.stop', this.stop, this)
    this.g = -20;
  }

  destroy() {
    super.destroy();

    Editor.off('game.start', this.start, this)
    Editor.off('game.stop', this.stop, this)
    Editor.off('tick', this.tick, this);
  }

  stop() {
    Editor.off('tick', this.tick, this);
  }
  
  start(e) {
    this.height = this.inputs.value('height');
    this.duration = this.inputs.value('duration');
    this.t = 0;
    this.startY = this.owner.y;
  }

  tick(delta) {
    this.t += delta/60;
    let x = Math.min(this.t/this.duration, 1);
    console.log(this.owner.y-this.startY)


    let d = (1-2*x)/Math.sqrt((1-x)*x);
    if(Number.isFinite(d)) {
      this.owner.y -= d;
    }
  }

  run() {
    // this.owner.y -= this.offset;
    Editor.on('tick', this.tick, this);
  }
}