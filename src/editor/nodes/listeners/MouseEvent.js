import {Listener, Template as ParentTemplate} from "./Listener";
import EventEmitter from "@/utils/EventEmitter";

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
  constructor(id, activity) {
    super(id, activity);

    this.stage.on('game.prestart', this.prestart, this)
    this.stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    
    this.stage.off('game.prestart', this.prestart, this)
    this.stage.off('game.stop', this.stop, this)
    this.stage.mouse.off('mouse.move', this.move, this);
    this.stage.mouse.off('mouse.stop', this.moveStop, this);
  }

  prestart() {
    this.stage.mouse.on('mouse.move', this.move, this);
    this.stage.mouse.on('mouse.stop', this.moveStop, this);
  }

  stop() {
    this.stage.mouse.off('mouse.move', this.move, this);
    this.stage.mouse.off('mouse.stop', this.moveStop, this);
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