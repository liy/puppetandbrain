import './CreateVariableButton.scss';

export default class
{
  constructor(icon, emoji) {
    this.element = document.createElement('div');
    this.element.className = 'create-variable-button-container';

    this.button = document.createElement('div');
    this.button.className = 'create-variable-button';
    this.element.appendChild(this.button);
    
    if(icon) {
      this.button.appendChild(icon);
    }
    if(emoji) {
      this.button.textContent = emoji;
    }
  }
}