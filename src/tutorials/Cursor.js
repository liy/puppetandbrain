import './Cursor.scss'
import rippleStr from '!raw-loader!../assets/ripple.svg'
import pointerStr from '!raw-loader!./tutorial-pointer.svg'

export default class Cursor
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'tutorial-cursor'
    document.body.appendChild(this.element);

    this.rippleSvg = new DOMParser().parseFromString(rippleStr, "image/svg+xml").rootElement;
    this.element.appendChild(this.rippleSvg)
    this.pointerSvg = new DOMParser().parseFromString(pointerStr, "image/svg+xml").rootElement;
    this.element.appendChild(this.pointerSvg);

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.element.addEventListener('transitionend', this.onTransitionEnd)
    this.element.addEventListener('webkitTransitionEnd', this.onTransitionEnd)
    this.element.addEventListener('msTransitionEnd', this.onTransitionEnd)

    this.currentTarget = null;

    this.direction('top');
  }

  transitionStart() {
    this.rippleSvg.style.display = 'none'
  }

  onTransitionEnd(e) {
    this.rippleSvg.style.display = 'inherit'
  }

  fadeIn() {
    this.element.style.opacity = 1;
  }

  fadeOut() {
    this.element.style.opacity = 0;
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
  }

  moveToLocation(x, y, dir='top') {
    this.direction(dir)
    this.transitionStart();
    this.x = x;
    this.y = y;
    this.fadeIn();
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) ${this.extraTransform} `;
  }

  direction(dir) {
    switch(dir) {
      case 'right':
        this.extraTransform = 'rotate(90deg) scale(-1, 1)'
        break;
      case 'left':
        this.extraTransform = 'rotate(-90deg)'
        break;
      case 'top':
        this.extraTransform = 'scale(1, 1)'
        break;
      case 'bottom':
        this.extraTransform = 'scale(1, -1)'
        break;
      default:
        this.extraTransform = 'scale(1, 1)'
        break;
    }
  }

  moveTo(target, dir) {
    // show and hide tooltip if any
    if(this.currentTarget) this.currentTarget.classList.remove('data-title-show');
    this.currentTarget = target;
    this.currentTarget.classList.add('data-title-show')

    this.fadeIn();
    let rect = target.getBoundingClientRect();
    this.moveToLocation(rect.x+rect.width/2, rect.y+rect.height/2, dir);
  }

  moveInto(target, dir) {
    this.fadeIn();
    let rect = target.getBoundingClientRect();
    target.appendChild(this.element);
    this.moveToLocation(rect.width/2, rect.height/2, dir);
  }
}