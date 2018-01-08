import './VariableBase.scss'

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

    this.name = document.createElement('div');
    this.container.appendChild(this.name);
    this.name.className = 'variable-name';
  }
}