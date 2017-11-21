import Task from "./Task";

export default class Keyboard extends Task
{
  constructor(id) {
    super(id);

    // TODO: make it authoring time variable!!!
    this.inputs.addName('key');
    this.keydown = this.keydown.bind(this)
  }

  init(pod) {
    super.init(pod);

    document.addEventListener('keydown', this.keydown)
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keydown', this.keydown)
  }

  get hasIn() {
    return false;
  }

  keydown(e) {
    // FIXME: make sure it only wrong when game is running!!!
    if(e.key == this.variables.key) {
      super.run();
      try {
        this.execution.run();
      }
      catch(e) {
        console.log('test')
      }
    }
  }
}