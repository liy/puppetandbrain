import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.GameLoop = {
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
}

export default class GameLoop extends Listener
{
  constructor(id, activity) {
    super(id, activity);

    this.stage.on('game.start', this.start, this)
    this.stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();

    this.stage.off('game.start', this.start, this)
    this.stage.off('game.stop', this.stop, this)
    this.stage.off('tick', this.tick, this);
  }

  stop() {
    this.stage.off('tick', this.tick, this);
  }
  
  start(e) {
    this.stage.on('tick', this.tick, this);
  }

  tick(delta) {
    super.run();
    this.outputs.assignValue('delta', delta);
    this.execution.run('tick');
  }
}