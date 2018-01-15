import './VariableElement.scss'
import NameField from './NameField';
import PropertyController from './PropertyController';

export default class 
{
  constructor(variable) {
    this.variable = variable;
    this.type = this.variable.type;
    
    this.element = document.createElement('div');
    this.element.className = 'variable-element';
    
    this.content = document.createElement('div');
    this.element.appendChild(this.content);
    this.content.className = 'variable-element-content';

    this.icon = document.createElement('div');
    this.content.appendChild(this.icon);
    this.icon.className = 'variable-icon';

    this.nameField = new NameField(this.variable.name);
    this.content.appendChild(this.nameField.element);

    this.onSelect = this.onSelect.bind(this);
    this.element.addEventListener('mousedown', this.onSelect);

    this._selected = false;
    
    this.onNameChange = this.onNameChange.bind(this);
    this.nameField.on('gadget.state.change', this.onNameChange);
  }

  onNameChange(name) {
    this.variable.name = name;
  }

  onSelect(e) {
    PropertyController.select(this);
  }

  select() {
    this._selected = true;
    this.element.classList.add('variable-element-selected') 
  }

  deselect() {
    this._selected = false;
    this.element.classList.remove('variable-element-selected')
  }

  toggle() {
    if(this._selected) {
      this.deselect();
    }
    else {
      this.select();
    }
  }

  focus() {
    this.nameField.focus();
  }

  get selected() {
    return this._selected;
  }
}