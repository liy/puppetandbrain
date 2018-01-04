import './BlockBody.scss';
import BlockIcon from '../gadgets/BlockIcon';
import {svgElement} from '../../utils/utils';

// TODO: remove this
import ClockIcon from '../../assets/icons/clock.svg';

export default class BlockBody
{
  constructor() {
    this.rows = new Array();

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'container');
    
    this.base = document.createElement('div');
    this.base.setAttribute('class', 'base');
    this.element.appendChild(this.base);

    this.body = document.createElement('div');
    this.body.setAttribute('class', 'body');
    this.base.appendChild(this.body);

    this.content = document.createElement('div');
    this.content.className = 'content';
    this.body.appendChild(this.content);

    this.left = document.createElement('div');
    this.left.className = 'left'
    this.content.appendChild(this.left);
    this.right = document.createElement('div');
    this.right.className = 'right';
    this.content.appendChild(this.right);

  }

  addLeft(pin) {
    pin.element.classList.add('item', 'item-left')
    this.left.appendChild(pin.element)
  }

  addRight(pin) {
    pin.element.classList.add('item', 'item-right')
    this.right.appendChild(pin.element)
  }
  
  set width(v) {
    this.element.style.width = `${v}px`
  }

  set height(v) {
    this.element.style.height = `${v}px`
  }
}