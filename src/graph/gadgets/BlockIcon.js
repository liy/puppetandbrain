import './BlockIcon.scss'
import Gadget from './Gadget';

export default class BlockIcon extends Gadget
{
  constructor(svg) {
    super();
    this.element.className = 'icon-container';
    
    this.icon = new DOMParser().parseFromString(svg, "image/svg+xml").rootElement;
    this.element.appendChild(this.icon);
  }
}