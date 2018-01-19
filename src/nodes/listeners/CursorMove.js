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

    Editor.on('game.prestart', this.prestart, this)
    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    
    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)

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