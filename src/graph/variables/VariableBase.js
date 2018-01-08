import './VariableBase.scss'
import VariableName from './VariableName';

export default class 
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'variable';

    // contains the swap background
    this.container = document.createElement('div');
    this.element.appendChild(this.container);
    this.container.className = 'variable-container';

    this.icon = document.createElement('div');
    this.container.appendChild(this.icon);
    this.icon.className = 'variable-icon';

    this.name = new VariableName();
    this.container.appendChild(this.name.element);
  }
}