import './BaseElement.scss'
import DragElement from './DragElement';
import GraphSelection from '../GraphSelection';

export default class BaseElement
{
  constructor(icon) {
    this.element = document.createElement('div');
    this.element.className = 'base-element';
    
    this.content = document.createElement('div');
    this.element.appendChild(this.content);
    this.content.className = 'element-content';

    this.icon = document.createElement('div');
    this.content.appendChild(this.icon);
    this.icon.className = 'element-icon';
    if(typeof icon == 'string') {
      this.icon.textContent = icon;
    }
    else {
      this.icon.appendChild(icon);
    }

    this.onClick = this.onClick.bind(this);
    this.element.addEventListener('click', this.onClick);
    
    this.dragStart = this.dragStart.bind(this);
    this.icon.addEventListener('mousedown', this.dragStart);

    this.selected = false;
  }

  init() {
    
  }

  destroy() {
    this.icon.removeEventListener('mousedown', this.dragStart);
    this.element.removeEventListener('click', this.onClick);

    // just in case user press exit while dragging the element
    if(this.dragElement) this.dragElement.destroy();
  }

  dragStart(e) {
    GraphSelection.deselect();

    this.dragElement = new DragElement(this);
    this.dragElement.dragStart(e);
  }

  onClick(e) {
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

  get name() {

  }
}