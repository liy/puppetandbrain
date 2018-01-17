import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.GameStart = {
  ...ParentTemplate,
  name: 'Game Start',
}

export default class GameStart extends Listener
{
  constructor(id) {
    super(id);

    this.start = this.start.bind(this)
    Editor.on('game.start', this.start)
  }

  destroy() {
    super.destroy();
    Editor.off('game.start', this.start)
  }
  
  start(e) {
    super.run();
    this.execution.run();
  }
}