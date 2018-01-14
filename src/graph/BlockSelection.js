
import ActorSelection from '../objects/ActorSelection'

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
    ActorSelection.enabled = !this.enabled;
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
      this.selected.body.element.classList.remove('block-selected')
    }
    this.selected = block;
    this.selected.body.element.classList.add('block-selected');
    this.selected.focus();
    
  }
  
  downOnEmptySpace(e) {
    if(e.target == BrainGraph.svg) this.deselectAll();;
  }

  deselectAll() {
    if(this.selected) {
      this.selected.body.element.classList.remove('block-selected')
      this.selected = null;
    }
  }

  delete() {
    if(this.selected) {
      History.push(Commander.create('DeleteBlock', this.selected.id).processAndSave());
      this.selected = null;
    }
  }
}

export default new BlockSelection();