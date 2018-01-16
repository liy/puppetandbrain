import './BaseElement.scss'
import NameField from './NameField';
import PropertyController from './PropertyController';

export default class 
{
  constructor(variable) {
    this.element = document.createElement('div');
    this.element.className = 'base-element';
    
    this.content = document.createElement('div');
    this.element.appendChild(this.content);
    this.content.className = 'element-content';

    this.icon = document.createElement('div');
    this.content.appendChild(this.icon);
    this.icon.className = 'element-icon';

    this.onSelect = this.onSelect.bind(this);
    this.element.addEventListener('mousedown', this.onSelect);

    this._selected = false;
  }

  onSelect(e) {
    PropertyController.select(this);
  }

  select() {
    this._selected = true;
    this.element.classList.add('element-selected') 
  }

  deselect() {
    this._selected = false;
    this.element.classList.remove('element-selected')
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

  focus() {
    // override this
  }
}