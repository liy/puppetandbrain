import EventListener from "./EventListener";
import Stage from '../../objects/Stage';

export default class GameStart extends EventListener
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
    if(e.key.toLowerCase() == this.variables.key.toLowerCase()) {
      super.run();
      this.execution.run();
    }
  }
}