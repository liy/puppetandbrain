import Listener from "./Listener";

export default class GameStart extends Listener
{
  constructor(id) {
    super(id);

    this.start = this.start.bind(this)
    Stage.on('game.start', this.start)
  }

  destroy() {
    super.destroy();
    Stage.off('game.start', this.start)
  }

  start(e) {
    super.run();
    this.execution.run();
  }
}