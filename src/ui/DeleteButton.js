import ActorSelection from '../objects/ActorSelection'
import BinButtonIcon from '../assets/bin-button-icon.svg';
import {svgElement} from '../utils/utils';
import ControlButton from './ControlButton';
import BlockSelection from '../graph/BlockSelection';

export default class BrainButton extends ControlButton
{
  constructor(controller) {
    super(controller);
    this.element = document.getElementById('bin-button');
    this.enabled = false;
    
    this.element.appendChild(svgElement(BinButtonIcon));

    this.element.addEventListener('mousedown', e => {
      if(this.mode == 'stage mode') {
        History.push(Commander.create('DeleteActor', ActorSelection.selected[0].id).processAndSave());
      }
      else {
        BlockSelection.delete();
      }
    })
  }

  stageMode() {
    BlockSelection.off('block.selection.change', this.onSelectChange, this)
    ActorSelection.on('actor.selection.change', this.onSelectChange, this);
    this.onSelectChange(ActorSelection.selected);
  }

  brainMode() {
    ActorSelection.off('actor.selection.change', this.onSelectChange, this);
    BlockSelection.on('block.selection.change', this.onSelectChange, this);
    this.onSelectChange(BlockSelection.selected);
  }

  onSelectChange(selected) {
    this.enabled = !(!selected || selected.length == 0);
  }
}