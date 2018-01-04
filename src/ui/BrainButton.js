require('./BrainButton.scss');
import ActorSelection from '../objects/ActorSelection'
import icon from '../assets/circuit.svg';
import {svgElement} from '../utils/utils';

export default class BrainButton
{
  constructor() {
    this.element = document.getElementById('brain-button');
    this.element.appendChild(svgElement(icon));

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