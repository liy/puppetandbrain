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
  constructor(id) {
    super(id);

    Editor.on('game.start', this.start, this)
    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();

    Editor.off('game.start', this.start, this)
    Editor.off('game.stop', this.stop, this)
  }

  stop() {
    PIXI.ticker.shared.remove(this.tick, this);
  }
  
  start(e) {
    PIXI.ticker.shared.add(this.tick, this);
  }

  tick(delta) {
    super.run();
    this.outputs.assignValue('delta', delta);
    this.execution.run('tick');
  }
}