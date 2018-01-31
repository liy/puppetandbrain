import ActorSelection from '../objects/ActorSelection'
import BinButtonIcon from '../assets/bin-button-icon.svg';
import {svgElement} from '../utils/utils';
import ControlButton from './ControlButton';
import GraphSelection from '../graph/GraphSelection';

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
        GraphSelection.delete();
      }
    })
  }

  stageMode() {
    this.element.setAttribute('data-title', "Delete puppet");
    GraphSelection.off('block.selection.change', this.onSelectChange, this)
    ActorSelection.on('actor.selection.change', this.onSelectChange, this);
    this.onSelectChange(ActorSelection.selected);
  }

  brainMode() {
    this.element.setAttribute('data-title', "Delete block");
    ActorSelection.off('actor.selection.change', this.onSelectChange, this);
    GraphSelection.on('block.selection.change', this.onSelectChange, this);
    this.onSelectChange(GraphSelection.selected);
  }

  onSelectChange(selected) {
    this.enabled = !(!selected || selected.length == 0);
  }
}