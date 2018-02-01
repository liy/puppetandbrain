import './NotificationChip.scss'

export default class 
{
  constructor(text) {
    this.element = document.createElement('div');
    this.element.className = 'notification-chip';

    this.element.textContent = text;

    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.element.addEventListener('transitionend', this.onTransitionEnd)
    this.element.addEventListener('webkitTransitionEnd', this.onTransitionEnd)
    this.element.addEventListener('msTransitionEnd', this.onTransitionEnd)
  }

  onTransitionEnd() {
    if(this.element.style.opacity == 0) {
      this.remove();
    }
  }

  remove() {
    this.element.removeEventListener('transitionend', this.onTransitionEnd)
    this.element.removeEventListener('webkitTransitionEnd', this.onTransitionEnd)
    this.element.removeEventListener('msTransitionEnd', this.onTransitionEnd)
    this.element.parentElement.removeChild(this.element);
  }

  delayFadeoutRemove(miniSeconds=2000) {
    setTimeout(() => {
      this.fadeOut();
    }, miniSeconds);
  }

  fadeIn() {
    this.element.style.opacity = 1;
  }

  fadeOut() {
    this.element.style.opacity = 0;
  }
}