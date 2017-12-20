

export default class BlockRow
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'a-row';

    this.itemLeft = document.createElement('div');
    this.itemLeft.className = 'item item-left';
    this.element.appendChild(this.itemLeft);

    this.itemRight = document.createElement('div');
    this.itemRight.className = 'item item-right';
    this.element.appendChild(this.itemRight);
  }
}