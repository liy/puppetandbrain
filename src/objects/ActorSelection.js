import EventEmitter from "../utils/EventEmitter";

// TODO: to be simplified
/**
 * Hold selection state
 * 
 * @class Selection
 */
class ActorSelection extends EventEmitter
{
  constructor() {
    super();

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
      this.emit('actor.selection.change', this.selected);
    }
  }

  set(target) {
    this.deselectAll();
    this.selected = [target];
    this.emit('actor.selection.change', this.selected);
  }

  deselectAll() {
    this.selected.forEach(entity => {
      entity.getComponent('SelectionComponent').deselect(entity)
    })
  }

  delete() {
    if(this.selected[0]) {
      History.push(Commander.create('DeleteActor', this.selected[0].id).processAndSave());
    }
  }
}

export default new ActorSelection();