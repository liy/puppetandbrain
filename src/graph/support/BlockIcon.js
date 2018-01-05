import './BlockIcon.scss'

export default class BlockIcon
{
  constructor(svg) {
    this.element = document.createElement('div')
    this.element.className = 'icon-container';
    this.element.appendChild(svg);
  }
}