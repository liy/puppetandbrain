import Listener from "./Listener";

export default class Keyboard extends Listener
{
  constructor(id) {
    super(id);

    this.execution.remove('default')
    this.execution.set('key down');
    this.execution.set('key up');

    this.inputs.addInput('key');

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
    if(e.key.toLowerCase() == this.inputs.value('key').toLowerCase()) {
      super.run();
      this.execution.run('key down');
    }
  }

  keyup(e) {
    if(e.key.toLowerCase() == this.inputs.value('key').toLowerCase()) {
      super.run();
      this.execution.run('key up');
    }
  }
}