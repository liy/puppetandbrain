class BlockSelection
{
  constructor() {
    this.enabled = false;
    this.keydown = this.keydown.bind(this);
    this.downOnEmptySpace = this.downOnEmptySpace.bind(this);
  }

  init(graph) {
    this.graph = graph;
    this.brain = this.graph.brain;
  }

  destroy() {
    document.removeEventListener('keydown', this.keydown);
  }

  toggle() {
    this.enabled = !this.enabled;
    if(this.enabled) {
      document.addEventListener('keydown', this.keydown);
      this.graph.container.addEventListener('mousedown', this.downOnEmptySpace);
    }
    else {
      document.removeEventListener('keydown', this.keydown);
      this.graph.container.removeEventListener('mousedown', this.downOnEmptySpace);
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
    if(e.target == this.graph.container) this.deselectAll();;
  }

  deselectAll() {
    if(this.selected) {
      this.selected.container.classList.remove('block-selected')
      this.selected = null;
    }
  }

  delete() {
    this.selected.delete();
    this.graph.removeBlock(this.selected)
    this.brain.removeNode(this.selected.node);
  }
}

export default new BlockSelection();