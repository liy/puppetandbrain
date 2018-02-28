import EventEmitter from "@/utils/EventEmitter";
import SoundEffect from '@/SoundEffect';

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
    this.emit('actor.selection.selected', this.selected);
  }

  deselectAll() {
    this.selected.forEach(entity => {
      entity.deselect(entity)
    })
  }

  delete() {
    if(this.selected[0]) {
      Hub.history.push(Commander.create('DeleteActor', this.selected[0].id).processAndSave());
      SoundEffect.play('trash');
    }
  }
}

export default new ActorSelection();