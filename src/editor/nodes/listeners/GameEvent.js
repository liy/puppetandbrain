import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.GameEvent = {
  ...ParentTemplate,
  className: 'GameEvent',
  execution: [{
    name: 'start'
  }, {
    name: 'stop'
  }],
  name: 'Game Event',
  keywords: ['game start', 'game stop']
}

export default class GameEvent extends Listener
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
  }
  
  start(e) {
    super.run();
    this.execution.run('start');
  }

  stop(e) {
    super.run();
    this.execution.run('stop');
  }
}