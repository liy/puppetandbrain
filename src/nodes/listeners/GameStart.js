import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.GameStart = {
  ...ParentTemplate,
  className: 'GameStart',
  name: 'Game Start',
}

export default class GameStart extends Listener
{
  constructor(id) {
    super(id);

    Editor.on('game.start', this.start, this)
  }

  destroy() {
    super.destroy();
    Editor.off('game.start', this.start, this)
  }
  
  start(e) {
    super.run();
    this.execution.run();
  }
}