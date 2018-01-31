import './BaseElement.scss'
import NameField from './NameField';
import DragElement from './DragElement';
import GraphSelection from '../GraphSelection';

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
    
    this.dragStart = this.dragStart.bind(this);
    this.icon.addEventListener('mousedown', this.dragStart);

    this.selected = false;
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

    GraphSelection.deselect();
  }

  onSelect(e) {
    GraphSelection.select(this);
  }

  select() {
    this.selected = true;
    this.element.classList.add('element-selected');
  }

  deselect() {
    this.selected = false;
    this.element.classList.remove('element-selected');
  }

  focus() {
    // override this
  }

  createIcon() {
    
  }

  get name() {

  }
}