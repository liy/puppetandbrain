import './BaseElement.scss'
import NameField from './NameField';
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

    this.onSelect = this.onSelect.bind(this);
    this.element.addEventListener('mousedown', this.onSelect);

    this._selected = false;

    
    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.icon.addEventListener('mousedown', this.dragStart);
  }

  destroy() {
    this.element.removeEventListener('mousedown', this.onSelect);
  }

  dragStart(e) {

    this.dragElement = new BaseElement();
    this.dragElement.element.classList.add('drag-element');
    this.dragElement.icon.appendChild(this.createIcon());
    document.body.appendChild(this.dragElement.element);
    this.dragElement.element.classList.add('element-selected');
    this.dragElement.element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

    document.addEventListener('mousemove', this.dragMove);
    document.addEventListener('mouseup', this.dragStop);
    
  }

  dragMove(e) {
    this.deselect();
    this.dragElement.element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  }

  dragStop() {
    document.removeEventListener('mouseup', this.dragStop);
    document.removeEventListener('mousemove', this.dragMove);
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