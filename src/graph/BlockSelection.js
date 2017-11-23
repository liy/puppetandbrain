class BlockSelection
{
  constructor() {
    this.enabled = false;
    this.keydown = this.keydown.bind(this);
    this.downOnEmptySpace = this.downOnEmptySpace.bind(this);
  }

  toggle() {
    this.enabled = !this.enabled;
    if(this.enabled) {
      document.addEventListener('keydown', this.keydown);
      BrainGraph.container.addEventListener('mousedown', this.downOnEmptySpace);
    }
    else {
      document.removeEventListener('keydown', this.keydown);
      BrainGraph.container.removeEventListener('mousedown', this.downOnEmptySpace);
    }
  }

  keydown(e) {
    switch(e.keyCode) {
      case 46:
        this.delete();
        break;
    }
  }

  select(block) {
    if(this.selected) {
      this.selected.container.classList.remove('block-selected')
    }
    this.selected = block;
    this.selected.container.classList.add('block-selected')
  }
  
  downOnEmptySpace(e) {
    if(e.target == BrainGraph.container) this.deselectAll();;
  }

  deselectAll() {
    if(this.selected) {
      this.selected.container.classList.remove('block-selected')
      this.selected = null;
    }
  }

  delete() {
    History.push(Commander.create('DeleteBlock', this.selected).process());
  }
}

export default new BlockSelection();