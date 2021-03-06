
import ActorSelection from '../objects/ActorSelection'
import EventEmitter from '@/utils/EventEmitter';
import ElementController from './elements/ElementController';
import Block from './blocks/Block'
import ConfirmModal from '../ui/ConfirmModal';
import SoundEffect from '@/SoundEffect';

class GraphSelection extends EventEmitter
{
  constructor() {
    super();

    this.downOnEmptySpace = this.downOnEmptySpace.bind(this);
  }

  enable() {
    document.addEventListener('keydown', this.keydown);
    BrainGraph.container.addEventListener('mousedown', this.downOnEmptySpace);
    
    ActorSelection.enabled = false;
  }

  disable() {
    document.removeEventListener('keydown', this.keydown);
    BrainGraph.container.removeEventListener('mousedown', this.downOnEmptySpace);

    ActorSelection.enabled = true;
  }

  select(selectable) {
    if(this.selected) {
      this.selected.deselect();
    }

    this.selected = selectable;
    this.selected.select();

    this.emit('block.selection.change', this.selected);
  }

  selectByID(id) {
    const block = BrainGraph.getBlock(id);
    this.select(block);
    return block
  }
  
  downOnEmptySpace(e) {
    if(e.target == BrainGraph.container || e.target == ElementController.panel.element) this.deselect();
  }

  deselect() {
    if(this.selected) {
      this.selected.deselect();
      this.selected = null;
    }
    this.emit('block.selection.change', this.selected);
  }

  async delete() {
    if(this.selected instanceof Block) {
      Hub.history.push(Commander.create('DeleteBlock', this.selected.id).processAndSave());
      SoundEffect.play('trash');
    }
    else {
      let action = true;
      if(this.selected.variable.inUse) {
        action = (await ConfirmModal.open('Variable is in use, do you really want to delete the varaible and its getters and setters?')).action;
      }
      
      if(action) {
        Hub.history.push(Commander.create('DeleteVariable', this.selected.variable.id, BrainGraph.brain.id).processAndSave())
        SoundEffect.play('trash');
      }
    }
    this.selected = null;
  }
}

export default new GraphSelection();