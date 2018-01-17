import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.Ticker = {
  ...ParentTemplate,
  name: 'Game Loop',
  execution: [{name: 'tick'}],
  keywords: [...ParentTemplate.keywords, 'ticker', 'accessibility']
}

export default class Ticker extends Listener
{
  constructor(id) {
    super(id);
  
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    Editor.on('game.start', this.start)
    Editor.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();

    Editor.off('game.start', this.start)
    Editor.off('game.stop', this.stop)
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