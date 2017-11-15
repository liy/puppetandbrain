import ExecutionInPin from "./ExecutionInPin";
import ExecutionOutPin from "./ExecutionOutPin";
import InputPin from "./InputPin";
import OutputPin from "./OutputPin";

// FIXME: clean up the UI!!!


export default class Block
{
  constructor(model) {
    this.model = model;

    this.inputPins = Object.create(null);
    this.outputPins = Object.create(null);
 
    this.container = document.createElement('div');

    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);

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
    this.container.style.top = e.clientY + this._dragOffset.y + 'px';
    this.container.style.left = e.clientX  + this._dragOffset.x + "px";
  }

  set x(v) {
    this.container.style.left = v +'px'
  }

  set y(v) {
    this.container.style.top = v +'px'
  }

  get width() {
    return this.container.getClientRects().width
  }

  get height() {
    return this.container.getClientRects().height;
  }
}