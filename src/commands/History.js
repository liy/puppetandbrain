class History
{
  constructor() {
    this.undos = [];
    this.redos = [];
    document.addEventListener('keydown', this.keydown.bind(this));
  }

  keydown(e) {
    if(e.keyCode == '90' && e.ctrlKey) {
      this.undo();
    }
    if(e.keyCode == '89' && e.ctrlKey) {
      this.redo();
    }
  }

  push(cmd) {
    this.undos.push(cmd)
    this.redos = [];
  }

  undo() {
    if(this.undos.length == 0) return;

    let cmd = this.undos.pop();
    cmd.undo();
    this.redos.push(cmd);

    if(cmd.passThrough) this.undo();
  }

  redo() {
    if(this.redos.length == 0) return;
    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);

    if(cmd.passThrough) this.redo();
  }

  clear() {
    this.undos = [];
    this.redos = [];
  }
}

window.History = new History();