import './BlockRow.scss'

export default class BlockRow
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'a-row';

    // You can seal the row even it is not fully filled
    this.sealed = false;
  }

  createLeft(name) {
    this.itemLeft = document.createElement('div');
    this.itemLeft.className = 'item item-left';
    this.element.appendChild(this.itemLeft);
    
    // TODO: testing
    let label = document.createElement('span');
    label.textContent = name;
    this.itemLeft.appendChild(label)
  }

  createRight(name) {
    this.itemRight = document.createElement('div');
    this.itemRight.className = 'item item-right';
    this.element.appendChild(this.itemRight);

    // TODO: testing
    let label = document.createElement('span');
    label.textContent = name;
    this.itemRight.appendChild(label)
  }

  get isFull() {
    return this.sealed || (this.itemLeft && this.itemRight);
  }

  get hasLeft() {
    return this.sealed || this.itemLeft;
  }

  get hasRight() {
    return this.sealed || this.itemRight;
  }
}