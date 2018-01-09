import './AVariablePanel.scss';

import DotIcon from '../../assets/dot.svg';
import ListIcon from '../../assets/list-icon.svg';
import MapIcon from '../../assets/dictionary-icon.svg';
import PositionIcon from '../../assets/position-icon.svg';
import PipetteIcon from '../../assets/pipette.svg';
import BinIcon from '../../assets/bin.svg';
import CreateVariableButton from './CreateVariableButton';

import GenericElement from './GenericElement';
import ListElement from './ListElement';
import MapElement from './MapElement';
import PositionElement from './PositionElement';
import ColorElement from './ColorElement';
import ActorElement from './ActorElement';

import VariblePanelManager from './VariblePanelManager';
import { svgElement } from '../../utils/utils';

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

    // variable buttons
    let genericButton = new CreateVariableButton(svgElement(DotIcon,{width:10, height:10}));
    let listButton = new CreateVariableButton(svgElement(ListIcon,{width:17, height:14}));
    let mapButton = new CreateVariableButton(svgElement(MapIcon,{width:15, height:15}));
    let positionButton = new CreateVariableButton(svgElement(PositionIcon,{width:10, height:16}));
    let pipetteButton = new CreateVariableButton(svgElement(PipetteIcon,{width:16, height:16}));
    let actorButton = new CreateVariableButton(null, '🐱');
    let binButton = new CreateVariableButton(svgElement(BinIcon,{width:18, height:18}));

    this.control.appendChild(genericButton.element);
    this.control.appendChild(listButton.element);
    this.control.appendChild(mapButton.element);
    this.control.appendChild(positionButton.element);
    this.control.appendChild(pipetteButton.element);
    this.control.appendChild(actorButton.element);
    this.control.appendChild(binButton.element);

    this.addGeneric = this.addGeneric.bind(this);
    this.addList = this.addList.bind(this);
    this.addMap = this.addMap.bind(this);
    this.addPosition = this.addPosition.bind(this);
    this.addColor = this.addColor.bind(this);
    this.addActor = this.addActor.bind(this);
    this.removeVariable = this.removeVariable.bind(this);

    genericButton.element.addEventListener('mousedown', this.addGeneric);
    listButton.element.addEventListener('mousedown', this.addList);
    mapButton.element.addEventListener('mousedown', this.addMap);
    positionButton.element.addEventListener('mousedown', this.addPosition);
    pipetteButton.element.addEventListener('mousedown', this.addColor);
    actorButton.element.addEventListener('mousedown', this.addActor);
    binButton.element.addEventListener('mousedown', this.removeVariable);
  }

  addGeneric() {
    this.add(new GenericElement());    
  }

  addList() {
    this.add(new ListElement());    
  }

  addMap() {
    this.add(new MapElement());    
  }

  addPosition() {
    this.add(new PositionElement());    
  }

  addColor() {
    this.add(new ColorElement());    
  }

  addActor() {
    this.add(new ActorElement());    
  }

  add(variable) {
    this.content.appendChild(variable.element);
  }

  remove(variable) {
    this.content.removeChild(variable.element);
  }

  removeVariable() {
    if(VariblePanelManager.selected) {
      this.content.removeChild(VariblePanelManager.selected.element);
    }
  }
}