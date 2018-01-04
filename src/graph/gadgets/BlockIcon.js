import './BlockIcon.scss'
import Gadget from './Gadget';

export default class BlockIcon extends Gadget
{
  constructor(svg) {
    super();
    this.element.className = 'icon-container';

    let str = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
      <image xlink:href="${require('../../assets/icons/clock.svg')}"/>    
    </svg>`
    
    this.icon = new DOMParser().parseFromString(str, "image/svg+xml").rootElement;
    this.element.appendChild(this.icon);
  }
}