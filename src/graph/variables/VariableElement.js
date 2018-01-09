import './VariableElement.scss'
import NameField from './NameField';
import VariblePanelManager from './VariblePanelManager';

export default class 
{
  constructor(data) {
    this.data = data;
    
    this.element = document.createElement('div');
    this.element.className = 'variable-element';
    
    this.content = document.createElement('div');
    this.element.appendChild(this.content);
    this.content.className = 'variable-element-content';

    this.icon = document.createElement('div');
    this.content.appendChild(this.icon);
    this.icon.className = 'variable-icon';

    this.name = new NameField();
    this.content.appendChild(this.name.element);

    this.onSelect = this.onSelect.bind(this);
    this.element.addEventListener('mousedown', this.onSelect);

    this._selected = false;
  }

  onSelect(e) {
    VariblePanelManager.select(this);
  }

  select() {
    this._selected = true;
    this.element.classList.add('variable-element-selected') 
    console.log('select', this.name.value);
  }

  deselect() {
    this._selected = false;
    this.element.classList.remove('variable-element-selected') 
    console.log('deselect', this.name.value);
  }

  toggle() {
    if(this._selected) {
      this.deselect();
    }
    else {
      this.select();
    }
  }

  get selected() {
    return this._selected;
  }
}