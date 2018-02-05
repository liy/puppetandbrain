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
    this.fadeIn();
    this.element.style.transform = `translate(${x}px, ${y}px)`;
  }

  moveTo(target) {
    this.fadeIn();
    let rect = target.getBoundingClientRect();
    this.moveToLocation(rect.x+rect.width/2, rect.y+rect.height/2);
  }

  moveInto(target) {
    this.fadeIn();
    let rect = target.getBoundingClientRect();
    target.appendChild(this.element);
    this.moveToLocation(rect.width/2, rect.height/2);
  }
}