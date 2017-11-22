class BlockSelection
{
  constructor() {
    this.enabled = false;
    this.keydown = this.keydown.bind(this);
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
    }
    else {
      document.removeEventListener('keydown', this.keydown);
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

  delete() {
    this.selected.delete();
    this.graph.removeBlock(this.selected)
    this.brain.removeNode(this.selected.node);
  }
}

export default new BlockSelection();