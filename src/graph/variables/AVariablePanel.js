import './AVariablePanel.scss';

import CreateGenericButton from './CreateGenericButton';
import CreateListButton from './CreateListButton';
import CreateMapButton from './CreateMapButton';
import CreatePositionButton from './CreatePositionButton';
import CreateColorButton from './CreateColorButton';
import CreateActorButton from './CreateActorButton';
import RemoveVariableButton from './RemoveVariableButton';
import { svgElement } from '../../utils/utils';

import DetailIcon from '../../assets/detail.svg';

export default class
{
  constructor() {

    this.element = document.createElement('div');
    this.element.id = 'variable-panel';

    this.title = document.createElement('span');
    this.title.id = 'variable-panel-title';
    this.title.textContent = 'Variables';
    this.element.appendChild(this.title)

    this.content = document.createElement('div');
    this.content.id = 'variable-panel-content';
    this.element.appendChild(this.content)
    
    this.control = document.createElement('div');
    this.control.id = 'variable-panel-control';
    this.element.appendChild(this.control)

    this.pullBtn = document.createElement('div');
    this.pullBtn.id = 'pull-button';
    this.element.appendChild(this.pullBtn);
    // detail icon
    this.pullBtn.appendChild(svgElement(DetailIcon, {width:16, height:16}));
    // toggle panel
    this.visible = false;
    this.pullBtn.addEventListener('mousedown', e => {
      this.element.style.right = this.visible ? '-280px' : 0;
      this.visible = !this.visible;
    })

    // variable buttons
    let genericButton = new CreateGenericButton();
    let listButton = new CreateListButton();
    let mapButton = new CreateMapButton();
    let positionButton = new CreatePositionButton();
    let pipetteButton = new CreateColorButton();
    let actorButton = new CreateActorButton();
    let binButton = new RemoveVariableButton();

    this.control.appendChild(genericButton.element);
    this.control.appendChild(listButton.element);
    this.control.appendChild(mapButton.element);
    this.control.appendChild(positionButton.element);
    this.control.appendChild(pipetteButton.element);
    this.control.appendChild(actorButton.element);
    this.control.appendChild(binButton.element);
  }

  clear() {
    while(this.content.lastChild) {
      this.remove(this.content.lastChild);
    }
  }

  append(element) {
    this.content.appendChild(element);
  }

  remove(element) {
    this.content.removeChild(element);
  }
}