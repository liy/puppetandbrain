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
    height: 250,
    duration: 1,
  },
  category: 'Animation',
  keywords: ['jump']
}

export default class Jump extends Task
{
  constructor(id, activity) {
    super(id, activity);

    ActivityManager.stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();

    Editor.off('game.stop', this.stop, this)
    Editor.off('tick', this.tick, this);
  }

  stop() {
    Editor.off('tick', this.tick, this);
  }

  tick({delta, deltaTime:dt}) {
    this.time += dt;

    if(this.time <= this.duration) {
      this.owner.y -= this.v*dt + 0.5*this.g*dt*dt;
      this.v += this.g*dt;
    }
    else {
      this.owner.y = this.startY;
      Editor.off('tick', this.tick, this);
      this.execution.run('completed');
    }
  }

  run() {
    const height = this.inputs.value('height');
    this.duration = this.inputs.value('duration');
    const hTime = this.duration/2;

    this.v = 2*height/hTime
    this.g = -2*height/(hTime*hTime);

    this.time = 0;
    this.startY = this.owner.y;

    ActivityManager.stage.on('tick', this.tick, this);
    this.execution.run();
  }
}