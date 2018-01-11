import {Listener, Template as ListenerTemplate} from "./Listener";

NodeTemplate.GameStart = {
  ...ListenerTemplate,
  name: 'Game Start'
}

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

  get nodeName() {
    return 'Game Start';
  }

  start(e) {
    super.run();
    this.execution.run();
  }
}