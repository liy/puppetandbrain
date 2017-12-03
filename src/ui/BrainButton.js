require('./BrainButton.scss');
import ActorSelection from '../objects/ActorSelection'

export default class BrainButton
{
  constructor() {
    this.element = document.getElementById('brain-button');

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