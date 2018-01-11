import {Listener, Template as ListenerTemplate} from "./Listener";

NodeTemplate.Ticker = {
  ...ListenerTemplate,
  name: 'Game Tick',
  out: ['tick']
}


export default class Ticker extends Listener
{
  constructor(id) {
    super(id);
  
    Stage.on('game.start', this.start, this)
    Stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();

    Stage.off('game.start', this.start, this)
    Stage.off('game.stop', this.stop, this)
  }

  get nodeName() {
    return 'Game Tick'
  }

  start() {
    PIXI.ticker.shared.add(this.tick, this);
  }

  stop() {
    PIXI.ticker.shared.remove(this.tick, this);
  }

  tick(e) {
    this.execution.run('tick')
  }
}