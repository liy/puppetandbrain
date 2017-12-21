import './BlockBody.scss';
import ExecutionPinSVG from '../gadgets/ExecutionPinSVG';
import BlockIcon from './BlockIcon';
import BlockRow from './BlockRow';
import ADataPin from './ADataPin';
import AExecutionPin from './AExecutionPin';

export default class BlockBody
{
  constructor() {
    this.rows = new Array();

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'base');

    this.body = document.createElement('div');
    this.body.setAttribute('class', 'body');
    this.element.appendChild(this.body);

    this.rowContainer = document.createElement('div');
    this.rowContainer.className = 'row-container';
    this.body.appendChild(this.rowContainer);

    this.icon = new BlockIcon(require('../../assets/icons/clock.svg'));
    this.body.appendChild(this.icon.element);
  }

  init({hasIn, executionNames, inputNames, outputNames}) {
    if(hasIn) {
      this.availableLeft.addLeft(new AExecutionPin(name));
    }

    for(let name of executionNames) {
      this.availableRight.addRight(new AExecutionPin(name));
    }

    for(let name of inputNames) {
      this.availableLeft.addLeft(new ADataPin(name));
    }

    for(let name of outputNames) {
      this.availableRight.addRight(new ADataPin(name));
    }
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