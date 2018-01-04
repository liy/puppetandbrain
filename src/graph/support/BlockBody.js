import './BlockBody.scss';
import BlockIcon from '../gadgets/BlockIcon';
import BlockRow from './BlockRow';

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

    this.rowContainer = document.createElement('div');
    this.rowContainer.className = 'row-container';
    this.body.appendChild(this.rowContainer);

    // this.icon = new BlockIcon(require('../../assets/icons/clock.svg'));
    // this.body.appendChild(this.icon.element);
  }

  addLeft(pin) {
    this.availableLeft.addLeft(pin)
  }

  addRight(pin) {
    this.availableRight.addRight(pin);
  }

  get availableLeft() {
    for(let row of this.rows) {
      if(!row.hasLeft) {
        return row;
      }
    }
    return this.createRow();
  }

  get availableRight() {
    for(let row of this.rows) {
      if(!row.hasRight) {
        return row;
      }
    }
    return this.createRow();
  }

  createRow() {
    let row = new BlockRow();
    this.rowContainer.appendChild(row.element);
    this.rows.push(row);
    return row;
  }
  
  set width(v) {
    this.element.style.width = `${v}px`
  }

  set height(v) {
    this.element.style.height = `${v}px`
  }
}