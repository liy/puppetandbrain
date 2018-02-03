import './ElementControlButton.scss';

export default class
{
  constructor(icon, emoji) {
    this.element = document.createElement('div');
    // this.element.className = 'element-control-button-container';

    this.element.className = 'element-control-button';
    // this.element.appendChild(this.element);
    
    if(icon) {
      this.element.appendChild(icon);
    }
    if(emoji) {
      this.element.textContent = emoji;
    }

    this.pointerDown = this.pointerDown.bind(this);

    this.element.addEventListener('mousedown', this.pointerDown);
    this.element.addEventListener('touchstart', this.pointerDown);
  }

  pointerDown() {
    // override this to create variable
  }

  show() {
    this.element.style.display = 'inherit';
  }

  hide() {
    this.element.style.display = 'none';
  }
}