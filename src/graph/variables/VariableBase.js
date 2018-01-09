import './VariableBase.scss'
import VariableName from './VariableName';
import VariblePanelManager from './VariblePanelManager';

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

    this.onSelect = this.onSelect.bind(this);
    this.element.addEventListener('mousedown', this.onSelect);

    this._expanded = false;
  }

  onSelect(e) {
    VariblePanelManager.select(this);
  }

  expand() {
    this._expanded = true;
    console.log('expand', this.name.value);
  }

  shrink() {
    this._expanded = false;
    console.log('shrink', this.name.value);
  }

  toggle() {
    if(this._expanded) {
      this.shrink();
    }
    else {
      this.expand();
    }
  }
}