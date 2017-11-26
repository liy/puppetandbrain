import Listener from "./Listener";

export default class Ticker extends Listener
{
  constructor(id) {
    super(id);
    Stage.on('game.start', this.start)
    Stage.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    Stage.off('game.start', this.start)
  }

  get nodeName() {
    return 'Tick'
  }

  start() {
    PIXI.ticker.shared.add(this.tick);
  }

  stop() {
    PIXI.ticker.shared.remove(this.tick);
  }

  tick(e) {
    super.run();
    this.execution.run()
  }
}