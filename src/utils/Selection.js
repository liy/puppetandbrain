// TODO: to be simplified
/**
 * Hold selection state
 * 
 * @class Selection
 */
class Selection
{
  constructor() {
    this.selected = [];
    this.enabled = true;

    document.addEventListener('keydown', this.keydown.bind(this));
  }

  keydown(e) {
    if(!this.enabled) return;

    switch(e.keyCode) {
      case 46:
        this.delete();
        break;
    }
  }

  add(target) {
    this.selected.push(target);
  }

  remove(target) {
    let i = this.selected.indexOf(target);
    if(i != -1) {
      this.selected.splice(i, 1);
    }
  }

  set(target) {
    this.deselectAll();
    this.selected = [target];
  }

  deselectAll() {
    this.selected.forEach(entity => {
      entity.getComponent('SelectionComponent').deselect(entity)
    })
  }

  delete() {
    if(this.selected[0]) {
      History.push(Commander.create('DeleteActor', this.selected[0].id).process());
    }
  }
}

export default new Selection();