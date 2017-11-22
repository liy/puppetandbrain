class History
{
  constructor() {
    this.undos = [];
    this.redos = [];
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
  }

  redo() {
    if(this.redos.length == 0) return;
    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);
  }

  clear() {
    this.undos = [];
    this.redos = [];
  }
}