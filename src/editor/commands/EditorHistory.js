import EventEmitter from '@/utils/EventEmitter';

export default class extends EventEmitter
{
  constructor() {
    super();

    this.undos = [];
    this.redos = [];
    
    this.enabled = true;
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
      this.updateButton()
    }
  }

  undo() {
    if(this.undos.length == 0 || !this.enabled) return;

    let cmd = this.undos.pop();
    cmd.undo();
    this.redos.push(cmd);

    Hub.autoSave();

    // if(cmd.passThrough) this.undo();
    this.updateButton()
  }

  redo() {
    if(this.redos.length == 0  || !this.enabled) return;
    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);

    Hub.autoSave();

    // if(cmd.passThrough) this.redo();
    this.updateButton()
  }

  clear() {
    this.removeAllListeners();

    this.undos = [];
    this.redos = [];

    this.updateButton()
  }

  updateButton() {
    this.emit('history.updated')
  }
}