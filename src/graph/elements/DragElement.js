export default class {
  constructor(icon, name) {
    this.element = document.createElement('div');
    this.element.className = 'base-element drag-element';
    
    this.icon = document.createElement('div');
    this.content.appendChild(this.icon);
    this.icon.className = 'element-icon';

    this.nameSpan = document.createElement('span');
    this.nameSpan.textContent = this.nameField.value;
    this.element.appendChild(span)
  }
}