import './AVariablePanel.scss';
import GenericVar from './GenericVar';
import ListVar from './ListVar';
import MapVar from './MapVar';
import PositionVar from './PositionVar';

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

    this.add(new GenericVar());
    this.add(new GenericVar());
    this.add(new ListVar());
    this.add(new MapVar());
    this.add(new PositionVar());
  }

  add(variable) {
    this.content.appendChild(variable.element);
  }
}