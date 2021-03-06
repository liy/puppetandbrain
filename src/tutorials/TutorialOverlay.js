import './TutorialOverlay.scss'

export default class
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'tutorial-overlay'; 
    document.body.appendChild(this.element);

    this.element.addEventListener('touchstart', e => e.preventDefault());
  }

  destroy() {
    document.body.removeChild(this.element);
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}