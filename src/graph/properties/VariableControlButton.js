import './VariableControlButton.scss';

export default class
{
  constructor(icon, emoji) {
    this.element = document.createElement('div');
    this.element.className = 'variable-control-button-container';

    this.button = document.createElement('div');
    this.button.className = 'variable-control-button';
    this.element.appendChild(this.button);
    
    if(icon) {
      this.button.appendChild(icon);
    }
    if(emoji) {
      this.button.textContent = emoji;
    }

    this.pointerDown = this.pointerDown.bind(this);

    this.element.addEventListener('mousedown', this.pointerDown);
    this.element.addEventListener('touchstart', this.pointerDown);
  }

  pointerDown() {
    // override this to create variable
  }
}