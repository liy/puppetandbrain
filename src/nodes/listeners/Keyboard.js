import Listener from "./Listener";

Template.Keyboard = {
  ...Template.Listener,
  name: 'Keyboard',
  out: ['down', 'up'],
  input: [{
    name: 'code',
    type: 'string'
  }]
}

export default class Keyboard extends Listener
{
  constructor(id) {
    super(id);

    this.keydown = this.keydown.bind(this)
    this.keyup = this.keyup.bind(this)
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Stage.on('game.prestart', this.prestart, this)
    Stage.on('game.stop', this.stop, this)
  }

  destroy() {
    super.destroy();
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
    if(e.code == this.inputs.value('code')) {
      super.run();
      this.execution.run('down');
    }
  }

  keyup(e) {
    if(e.code == this.inputs.value('code')) {
      super.run();
      this.execution.run('up');
    }
  }
}