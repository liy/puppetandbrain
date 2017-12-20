import './BlockIcon.scss'

export default class BlockIcon
{
  constructor(svg) {
    this.element = document.createElement('div');
    this.element.className = 'icon-container';
    
    this.icon = new DOMParser().parseFromString(svg, "image/svg+xml").rootElement;
    this.element.appendChild(this.icon);
  }
}