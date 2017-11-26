import Listener from "./Listener";

export default class KeyDown extends Listener
{
  constructor(id) {
    super(id);

    this.inputs.addInput('key');
    this.keydown = this.keydown.bind(this)
    this.prestart = this.prestart.bind(this);
    this.stop = this.stop.bind(this);

    Stage.on('game.prestart', this.prestart)
    Stage.on('game.stop', this.stop)
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keydown', this.keydown)
  }

  prestart() {
    document.addEventListener('keydown', this.keydown)
  }

  stop() {
    document.removeEventListener('keydown', this.keydown)
  }

  keydown(e) {
    if(e.key.toLowerCase() == this.variables.key.toLowerCase()) {
      super.run();
      this.execution.run();
    }
  }
}