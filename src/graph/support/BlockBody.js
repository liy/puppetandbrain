import './BlockBody.scss';

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

    this.body.style.backgroundImage = `url("${require('!file-loader!../../assets/icons/clock.svg')}")`
    this.body.style.backgroundRepeat = 'no-repeat';
    this.body.style.backgroundPosition = 'center';
  }

  addLeft(pin) {
    // pin.element.classList.add('pin-left')
    this.left.appendChild(pin.element)
  }

  addRight(pin) {
    // pin.element.classList.add('pin-right')
    this.right.appendChild(pin.element)
  }

  set minHeight(v) {
    this.element.style.minHeight = `${v}px`;
  }

  set minWidth(v) {
    this.element.style.minWidth = `${v}px`;
  }

  set maxWidth(v) {
    this.content.style.maxWidth = `${v}px`;
  }

  set maxHeight(v) {
    this.content.style.maxHeight = `${v}px`;
  }
  
  set width(v) {
    this.content.style.width = `${v}px`
  }

  set height(v) {
    this.content.style.height = `${v}px`
  }

  set baseColor(c) {
    this.base.style.backgroundColor = c;
  }

  set color(c) {
    this.body.style.backgroundColor = c;
  }
}