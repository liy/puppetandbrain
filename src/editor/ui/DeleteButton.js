import ActorSelection from '../objects/ActorSelection'
import BinButtonIcon from '@/assets/bin-button-icon.svg';
import {svgElement} from '@/utils/utils';
import ControlButton from './ControlButton';
import GraphSelection from '../graph/GraphSelection';
import SoundEffect from '@/SoundEffect';

export default class BrainButton extends ControlButton
{
  constructor(controller) {
    super(controller);
    this.element = document.getElementById('bin-button');
    this.enabled = false;
    
    this.element.appendChild(svgElement(BinButtonIcon, {width:68, height:68}));

    this.element.addEventListener('mousedown', e => {
      
      if(this.mode == 'stage mode') {
        Hub.history.push(Commander.create('DeleteActor', ActorSelection.selected[0].id).processAndSave());
        SoundEffect.play('trash');
      }
      else {
        GraphSelection.delete();
      }
    })

    this.element.addEventListener('mouseover', e => {
      if(this.mode == 'stage mode') {
        this.element.setAttribute('data-title', `Delete "${ActorSelection.selected[0].name}" 😱`);
      }
      else {
        // block
        if(GraphSelection.selected.node) {
          this.element.setAttribute('data-title', `Delete "${GraphSelection.selected.node.nodeName}" 😨`);
        }
        else {
          let name = GraphSelection.selected.name;
          let tooltip = (name == '') ? 'delete variable 😨' : `Delete "${name}" 😨`;
          this.element.setAttribute('data-title', tooltip);
        }
      }
    })
  }

  stageMode() {
    GraphSelection.off('block.selection.change', this.onSelectChange, this)
    ActorSelection.on('actor.selection.change', this.onSelectChange, this);
    this.onSelectChange(ActorSelection.selected);
  }

  brainMode() {
    ActorSelection.off('actor.selection.change', this.onSelectChange, this);
    GraphSelection.on('block.selection.change', this.onSelectChange, this);
    this.onSelectChange(GraphSelection.selected);
  }
  

  onSelectChange(selected) {
    if(selected) {
      if(selected.deletable) {
        this.enabled = true;
      }
      else {
        // check if it is actor selection
        this.enabled = selected.length > 0
      }
    }
    else {
      this.enabled = false;
    }
  }
}