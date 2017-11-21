import Task from "./Task";

export default class KeyDown extends Task
{
  constructor(id) {
    super(id);

    // TODO: make it authoring time variable!!!
    this.inputs.addName('key');
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

  get hasIn() {
    return false;
  }

  keydown(e) {
    if(e.key.toLowerCase() == this.variables.key.toLowerCase()) {
      super.run();
      this.execution.run();
    }
  }
}