import ExecutionInPin from "./ExecutionInPin";
import ExecutionOutPin from "./ExecutionOutPin";
import InputPin from "./InputPin";
import OutputPin from "./OutputPin";

import styles from '../css/Block.scss';

// FIXME: clean up the UI!!!


export default class Block
{
  constructor(model) {
    this.model = model;

    this.inputPins = Object.create(null);
    this.outputPins = Object.create(null);
 
    this.container = document.createElement('div');
    this.container.className = 'block';

    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);

    this._x = 0;
    this._y = 0;

    this.container.addEventListener('mousedown', this.dragstart);
    document.addEventListener('mouseup', this.dragstop);
  }

  dragstart(e) {
    e.stopPropagation();
  
    this._dragOffset = {
      x: this.container.offsetLeft - e.clientX,
      y: this.container.offsetTop - e.clientY
    }
    document.addEventListener('mousemove', this.dragmove)
  }

  dragstop(e) {
    document.removeEventListener('mousemove', this.dragmove)
  }

  dragmove(e) {
    this.x = e.clientX + this._dragOffset.x;
    this.y = e.clientY + this._dragOffset.y;
  }

  set x(x) {
    this._x = x;
    this.container.style.left = x +'px'
  }

  set y(y) {
    this._y = y;
    this.container.style.top = y +'px'
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this.container.getClientRects().width
  }

  get height() {
    return this.container.getClientRects().height;
  }
}