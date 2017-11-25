import EventListener from "./EventListener";

export default class KeyUp extends EventListener
{
  constructor(id) {
    super(id);

    this.inputs.addInput('key');
    this.keyup = this.keyup.bind(this)
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keyup', this.keyup)
  }

  prestart() {
    super.prestart();
    document.addEventListener('keyup', this.keyup)
  }

  terminate() {
    super.terminate()
    document.removeEventListener('keyup', this.keyup)
  }

  keyup(e) {
    if(e.key.toLowerCase() == this.variables.key.toLowerCase()) {
      super.run();
      this.execution.run();
    }
  }
}