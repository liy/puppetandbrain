import EventEmitter from '@/utils/EventEmitter';

export default class extends EventEmitter
{
  constructor() {
    super();

    this.undos = [];
    this.redos = [];
  }

  push(cmd) {
    if(cmd && !Hub.historyLock) {
      
      // action modified the activity
      Hub.activity.dirty = true;

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
    if(!this.canUndo) return;

    // action modified the activity
    Hub.activity.dirty = true;

    let cmd = this.undos.pop();
    cmd.undo();
    this.redos.push(cmd);

    Hub.autoSave();

    // if(cmd.passThrough) this.undo();
    this.updateButton()
  }

  redo() {
    if(!this.canRedo) return;
    
    // action modified the activity
    Hub.activity.dirty = true;

    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);

    Hub.autoSave();

    // if(cmd.passThrough) this.redo();
    this.updateButton()
  }

  destroy() {
    super.destroy();
    this.clear();
  }

  clear() {
    this.undos = [];
    this.redos = [];

    this.updateButton()
  }

  get canUndo() {
    return this.undos.length != 0 && !Hub.historyLock
  }

  get canRedo() {
    return this.redos.length != 0 && !Hub.historyLock
  }

  updateButton() {
    this.emit('history.updated')
  }
}