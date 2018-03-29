import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.set({
  ...ParentTemplate,
  name: 'Game Loop',
  className: 'GameLoop',
  execution: [{
    name: 'tick'
  }],
  outputs: [{
    name: 'delta',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  keywords: ['tick']
})

export default class GameLoop extends Listener
{
  constructor(id, activity) {
    super(id, activity);

    this.activity.on('game.start', this.start, this)
    this.activity.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();

    this.activity.off('game.start', this.start, this)
    this.activity.off('game.stop', this.stop, this)
    this.activity.off('tick', this.tick, this);
  }

  stop() {
    this.activity.off('tick', this.tick, this);
  }
  
  start(e) {
    this.activity.on('tick', this.tick, this);
  }

  tick(delta) {
    super.run();
    this.outputs.assignValue('delta', delta.deltaTime);
    this.execution.run('tick');
  }
}