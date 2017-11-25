import EventListener from "./EventListener";

export default class KeyDown extends EventListener
{
  constructor(id) {
    super(id);

    this.inputs.addInput('key');
    this.keydown = this.keydown.bind(this)
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keydown', this.keydown)
  }

  prestart() {
    super.prestart();
    document.addEventListener('keydown', this.keydown)
  }

  terminate() {
    super.terminate()
    document.removeEventListener('keydown', this.keydown)
  }

  keydown(e) {
    if(e.key.toLowerCase() == this.variables.key.toLowerCase()) {
      super.run();
      this.execution.run();
    }
  }
}