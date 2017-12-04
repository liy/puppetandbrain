class History
{
  constructor() {
    this.undos = [];
    this.redos = [];
    document.addEventListener('keydown', this.keydown.bind(this));
    
    this.undoBtn = document.getElementById('undo-button');
    this.redoBtn = document.getElementById('redo-button');
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.undoBtn.addEventListener('click', this.undo)
    this.redoBtn.addEventListener('click', this.redo)
    this.updateButton()

    this.enabled = true;
  }

  set blur(v) {
    this.enabled = !v;
    if(v) {
      this.redoBtn.classList.add('blur');
      this.undoBtn.classList.add('blur');
    }
    else {
      this.redoBtn.classList.remove('blur');
      this.undoBtn.classList.remove('blur');
    }
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

    LookUp.save();

    // if(cmd.passThrough) this.undo();
    this.updateButton()
  }

  redo() {
    if(this.redos.length == 0  || !this.enabled) return;
    let cmd = this.redos.pop();
    cmd.redo();
    this.undos.push(cmd);

    LookUp.save();

    // if(cmd.passThrough) this.redo();
    this.updateButton()
  }

  clear() {
    this.undos = [];
    this.redos = [];

    this.updateButton()
  }

  updateButton() {
    if(this.undos.length == 0) {
      this.undoBtn.style.opacity = 0.2;
      this.undoBtn.style.cursor = 'default'
    }
    else {
      this.undoBtn.style.opacity = 1;
      this.undoBtn.style.cursor = 'pointer'
    }

    if(this.redos.length == 0) {
      this.redoBtn.style.opacity = 0.2;
      this.redoBtn.style.cursor = 'default'
    }
    else {
      this.redoBtn.style.opacity = 1;
      this.redoBtn.style.cursor = 'pointer'
    }
  }
}

window.History = new History();