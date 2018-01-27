import ActorSelection from '../objects/ActorSelection'
import BrainButtonIcon from '../assets/brain-button-icon.svg';
import {svgElement} from '../utils/utils';
import ControlButton from './ControlButton';

export default class BrainButton extends ControlButton
{
  constructor() {
    super();
    this.element = document.getElementById('brain-button');
    this.element.appendChild(svgElement(BrainButtonIcon));

    ActorSelection.on('actor.selection.change', selected => {
      this.element.style.visibility = (selected.length != 0) ? 'visible' : 'hidden';
    })

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      let brain = ActorSelection.selected[0].brain;
      BrainGraph.open(brain)
    })
  }
}