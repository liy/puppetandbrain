import './Cursor.scss'

export default class Cursor
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'tutorial-cursor'
    document.body.appendChild(this.element);
  }

  fadeIn() {
    this.element.style.opacity = 1;
  }

  fadeOut() {
    this.element.style.opacity = 0;
  }

  moveToLocation(x, y) {
    this.element.style.transform = `translate(${x}px, ${y}px)`;
  }

  moveTo(target) {
    let rect = target.getBoundingClientRect();
    this.moveToLocation(rect.x+rect.width/2, rect.y+rect.height/2);
  }
}