import {Listener, Template as ParentTemplate} from "./Listener";
import DataType from "../../data/DataType";

NodeTemplate.KeyboardEvent = {
  ...ParentTemplate,
  className: 'KeyboardEvent',
  name: 'Keyboard Event',
  execution: [{
      name: 'down'
    }, {
      name: 'up'
    }
  ],
  inputs: [{
    name: 'key name',
    descriptor: {
      type: DataType.STRING,
      gadgetClassName: 'KeyNameCatcher',
    }
  }],
  memory: {
    'key name': 'Space'
  },
  keywords: ['key down', 'key up', 'key']
}

export default class KeyboardEvent extends Listener
{
  constructor(id) {
    super(id);

    this.keydown = this.keydown.bind(this)
    this.keyup = this.keyup.bind(this)

    Editor.on('game.prestart', this.prestart, this)
    Editor.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
    
    Editor.off('game.prestart', this.prestart, this)
    Editor.off('game.stop', this.stop, this)

    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.keyup)
  }

  prestart() {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
  }

  stop() {
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.keyup)
  }

  keydown(e) {
    if(e.code == this.inputs.value('key name')) {
      super.run();
      this.execution.run('down');
    }
  }

  keyup(e) {
    if(e.code == this.inputs.value('key name')) {
      super.run();
      this.execution.run('up');
    }
  }
}