import './BlockBody.scss';
import ExecutionSVG from '../gadgets/ExecutionSVG';
import BlockIcon from './BlockIcon';

export default class BlockBody
{
  constructor() {
    this.rows = new Array();

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'base');

    this.body = document.createElement('div');
    this.body.setAttribute('class', 'body');
    this.element.appendChild(this.body);

    this.icon = new BlockIcon(require('../../assets/icons/clock.svg'));
    this.element.appendChild(this.icon.element);
    
    this.addRow();
    this.addRow();

  }

  addRow() {
    let row = document.createElement('div');
    row.className = 'a-row';
    this.body.appendChild(row);
    this.rows.push(row);

    let item = document.createElement('div');
    item.className = 'item';
    row.appendChild(item);
    let exec = new ExecutionSVG();
    item.appendChild(exec.element);

    item = document.createElement('div');
    item.className = 'item';
    row.appendChild(item);
    exec = new ExecutionSVG();
    item.appendChild(exec.element);

    return row;
  }

  getRow(i) {

  }

  removeRow(i) {

  }
  
  set width(v) {
    this.element.style.width = `${v}px`
  }

  set height(v) {
    this.element.style.height = `${v}px`
  }
}