import ExecutionInPin from "./ExecutionInPin";
import ExecutionOutPin from "./ExecutionOutPin";
import InputPin from "./InputPin";
import OutputPin from "./OutputPin";

// FIXME: clean up the UI!!!


export default class Block
{
  constructor(model) {
    this.model = model;
 
    this.elm = document.createElement('div');

    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);

    this.elm.addEventListener('mousedown', this.dragstart);
    document.addEventListener('mouseup', this.dragstop);
  }

  dragstart(e) {
    e.stopPropagation();
  
    this._dragOffset = {
      x: this.elm.offsetLeft - e.clientX,
      y: this.elm.offsetTop - e.clientY
    }
    document.addEventListener('mousemove', this.dragmove)
  }

  dragstop(e) {
    document.removeEventListener('mousemove', this.dragmove)
  }

  dragmove(e) {
    this.elm.style.top = e.clientY + this._dragOffset.y + 'px';
    this.elm.style.left = e.clientX  + this._dragOffset.x + "px";
  }

  set x(v) {
    this.elm.style.left = v +'px'
  }

  set y(v) {
    this.elm.style.top = v +'px'
  }

  get width() {
    return this.elm.getClientRects().width
  }

  get height() {
    return this.elm.getClientRects().height;
  }
}