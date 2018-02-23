import EventEmitter from '@/utils/EventEmitter';

class History extends EventEmitter
{
  constructor() {
    super();

    this.undos = [];
    this.redos = [];
    this.keydown = this.keydown.bind(this);
    document.addEventListener('keydown', this.keydown);

    this.updateButton()
    
    this.enabled = true;
  }

  destroy() {
    super.destroy();
    this.undos = null;
    this.redos = null;
    document.body.removeChild(this.panel.element);
    document.removeEventListener('keydown', this.keydown);
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
      this.updateButton()
    }
  }

  undo() {
    if(this.undos.length == 0 || !this.enabled) return;

    let cmd = this.undos.pop();
    cmd.undo();
    this.redos.push(cmd);

    Activity.autoSave();

    // if(cmd.passThrough) this.undo();
    this.updateButton()
  }

  redo() {
    if(this.redos.length == 0  || !this.enabled) return;
    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);

    Activity.autoSave();

    // if(cmd.passThrough) this.redo();
    this.updateButton()
  }

  clear() {
    this.undos = [];
    this.redos = [];

    this.updateButton()
  }

  updateButton() {
    this.emit('history.updated')
  }
}

window.EditorHistory = new History();
export default EditorHistory; 