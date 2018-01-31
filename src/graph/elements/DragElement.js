import './DragElement.scss'

export default class {
  constructor(sourceElement) {
    this.sourceElement = sourceElement;

    this.element = document.createElement('div');
    this.element.className = 'base-element drag-element element-selected';
    
    this.icon = document.createElement('div');
    this.icon.appendChild(this.sourceElement.createIcon())
    this.element.appendChild(this.icon);
    this.icon.className = 'element-icon';

    this.nameSpan = document.createElement('span');
    this.nameSpan.textContent = this.sourceElement.name;
    this.element.appendChild(this.nameSpan)
    
    this.dragMove = this.dragMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
  }

  destroy() {
    document.body.removeChild(this.element);
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.dragStop);
  }

  moveTo(x, y) {
    this.element.style.transform = `translate(${x}px, ${y}px)`
  }

  dragStart(e) {
    document.body.appendChild(this.element);
    this.moveTo(e.clientX, e.clientY);

    document.addEventListener('mousemove', this.dragMove);
    document.addEventListener('mouseup', this.dragStop);
  }

  dragMove(e) {
    this.moveTo(e.clientX, e.clientY);
  }

  dragStop() {
    document.removeEventListener('mouseup', this.dragStop);
    document.removeEventListener('mousemove', this.dragMove);

    this.destroy();
  }

}