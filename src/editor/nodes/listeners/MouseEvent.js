import {Listener, Template as ParentTemplate} from "./Listener";
import EventEmitter from "../../utils/EventEmitter";

NodeTemplate.MouseEvent = {
  ...ParentTemplate,
  className: 'MouseEvent',
  name: 'Mouse Event',
  execution: [{
    name: 'move'
  }, {
    name: 'stop'
  }],
  keywords: [...ParentTemplate.keywords, 'mouse', 'cursor']
}

export default class MouseEvent extends Listener
{
  constructor(id) {
    super(id);

    Editor.on('game.prestart', this.prestart, this)
    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    
    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)
    Editor.mouse.off('mouse.move', this.move, this);
    Editor.mouse.off('mouse.stop', this.moveStop, this);
  }

  prestart() {
    Editor.mouse.on('mouse.move', this.move, this);
    Editor.mouse.on('mouse.stop', this.moveStop, this);
  }

  stop() {
    Editor.mouse.off('mouse.move', this.move, this);
    Editor.mouse.off('mouse.stop', this.moveStop, this);
  }

  move(e) {
    super.run();
    this.execution.run('move');
  }

  moveStop() {
    super.run();
    this.execution.run('stop');
  }
}