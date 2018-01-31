import './BaseElement.scss'
import NameField from './NameField';
import DragElement from './DragElement';
import ElementController from './ElementController';

export default class BaseElement
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'base-element';
    
    this.content = document.createElement('div');
    this.element.appendChild(this.content);
    this.content.className = 'element-content';

    this.icon = document.createElement('div');
    this.content.appendChild(this.icon);
    this.icon.className = 'element-icon';
    let icon = this.createIcon();
    if(typeof icon == 'string') {
      this.icon.textContent = icon;
    }
    else {
      this.icon.appendChild(icon);
    }

    this.onSelect = this.onSelect.bind(this);
    this.element.addEventListener('click', this.onSelect);

    this._selected = false;
    
    this.dragStart = this.dragStart.bind(this);
    this.icon.addEventListener('mousedown', this.dragStart);
  }

  destroy() {
    this.icon.removeEventListener('mousedown', this.dragStart);
    this.element.removeEventListener('click', this.onSelect);

    // just in case user press exit while dragging the element
    if(this.dragElement) this.dragElement.destroy();
  }

  dragStart(e) {
    this.dragElement = new DragElement(this);
    this.dragElement.dragStart(e);
    if(ElementController.selected) ElementController.selected.deselect();
  }

  onSelect(e) {
    ElementController.select(this);
  }

  select() {
    this._selected = true;
    this.element.classList.add('element-selected');
  }

  deselect() {
    this._selected = false;
    this.element.classList.remove('element-selected');
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

  createIcon() {
    
  }

  get name() {

  }
}