import ActorSelection from '../objects/ActorSelection'
import BinButtonIcon from '../assets/bin-button-icon.svg';
import {svgElement} from '../utils/utils';
import ControlButton from './ControlButton';
import BlockSelection from '../graph/BlockSelection';

export default class BrainButton extends ControlButton
{
  constructor() {
    super();
    this.element = document.getElementById('bin-button');
    this.element.appendChild(svgElement(BinButtonIcon));

    this.onDeleteActor = this.onDeleteActor.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
  }

  stageMode() {
    ActorSelection.on('actor.selection.change', selected => {
      this.element.style.visibility = (selected.length != 0) ? 'visible' : 'hidden';
    })

    this.element.addEventListener('mousedown', this.onDeleteActor)
    this.element.removeEventListener('mousedown', this.onDeleteBlock)
  }

  graphMode() {
    this.element.style.visibility = 'hidden';
    
    BlockSelection.on('block.selection.change', selected => {
      this.element.style.visibility = (selected.length != 0) ? 'visible' : 'hidden';
    })

    this.element.removeEventListener('mousedown', this.onDeleteActor)
    this.element.addEventListener('mousedown', this.onDeleteBlock)
  }

  onDeleteBlock(e) {
    BlockSelection.delete();
  }

  onDeleteActor(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    History.push(Commander.create('DeleteActor', ActorSelection.selected[0].id).processAndSave());
  }
}