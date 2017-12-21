import './BlockRow.scss'
import AExecutionPin from './AExecutionPin';

export default class BlockRow
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'a-row';

    // You can seal the row even it is not fully filled
    this.sealed = false;
  }

  addLeft(pin) {
    this.itemLeft = pin;
    pin.element.className = 'item item-left';
    this.element.appendChild(pin.element);
  }

  addRight(pin) {
    this.itemRight = pin;
    pin.element.className = 'item item-right';
    this.element.appendChild(pin.element);
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