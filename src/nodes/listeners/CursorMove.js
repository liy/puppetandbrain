import {Listener, Template as ParentTemplate} from "./Listener";

NodeTemplate.CursorMove = {
  ...ParentTemplate,
  name: 'Cursor Move',
  keywords: [...ParentTemplate.keywords, 'mouse', 'cursor']
}

export default class CursorMove extends Listener
{
  constructor(id) {
    super(id);

    this.move = this.move.bind(this);
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Stage.on('game.prestart', this.prestart)
    Stage.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    
    Stage.off('game.prestart', this.prestart)
    Stage.off('game.stop', this.stop)

    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  prestart() {
    document.addEventListener('mousemove', this.move);
    document.addEventListener('touchmove', this.move);
  }

  stop() {
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
  }

  move(e) {
    super.run();
    this.execution.run();
  }
}