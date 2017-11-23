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
    if(cmd) {
      this.undos.push(cmd)
      this.redos = [];

      // cap the number of undo to be 200
      // TODO: maybe allow more?
      if(this.undos.length > 200) {
        this.undos.shift();
      }
    }
  }

  undo() {
    if(this.undos.length == 0) return;

    let cmd = this.undos.pop();
    cmd.undo();
    this.redos.push(cmd);

    // if(cmd.passThrough) this.undo();
  }

  redo() {
    if(this.redos.length == 0) return;
    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);

    // if(cmd.passThrough) this.redo();
  }

  clear() {
    this.undos = [];
    this.redos = [];
  }
}

window.History = new History();