import './ModeButton.scss'
import ActorSelection from '../objects/ActorSelection'
import BrainButtonIcon from '../assets/brain-button-icon.svg';
import StageButtonIcon from '../assets/stage-button-icon.svg';
import {svgElement} from '../utils/utils';
import ControlButton from './ControlButton';

export default class extends ControlButton
{
  constructor(controller) {
    super(controller);
    this.element = document.getElementById('mode-button');
    this.enabled = false;

    this.brainBtn = svgElement(BrainButtonIcon, {width:100, height: 100});
    this.stageBtn = svgElement(StageButtonIcon, {width:100, height: 100});

    this.brainBtn.addEventListener('mousedown', e => {
      if(!this.enabled) return;

      let brain = ActorSelection.selected[0].brain;
      History.push(Commander.create('OpenGraph', brain.id).process());
    })

    this.stageBtn.addEventListener('mousedown', e => {
      if(!this.enabled) return;

      History.push(Commander.create('CloseGraph', BrainGraph.brain.id).process());
    })
  }

  stageMode() {
    super.stageMode();

    this.element.setAttribute('data-title', "Open puppet brain");
    this.element.appendChild(this.brainBtn);
    if(this.element.contains(this.stageBtn)) this.element.removeChild(this.stageBtn);
    
    ActorSelection.on('actor.selection.change', this.onActorSelected, this);
    this.onActorSelected(ActorSelection.selected);
  }

  brainMode() {
    super.brainMode();

    this.element.setAttribute('data-title', "Back to stage");
    this.element.appendChild(this.stageBtn);
    if(this.element.contains(this.brainBtn)) this.element.removeChild(this.brainBtn);
    
    ActorSelection.off('actor.selection.change', this.onActorSelected, this);
    this.enabled = true;
  }

  onActorSelected(selected) {
    this.enabled = selected.length != 0;
  }
}