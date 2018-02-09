import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.GameEvent = {
  ...ParentTemplate,
  className: 'GameEvent',
  execution: [{
    name: 'start'
  }, {
    name: 'tick'
  }],
  name: 'Game Event',
}

export default class GameEvent extends Listener
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
    super.run();
    PIXI.ticker.shared.add(this.tick, this);
    this.execution.run('start');
  }

  tick() {
    super.run();
    this.execution.run('tick');
  }
}