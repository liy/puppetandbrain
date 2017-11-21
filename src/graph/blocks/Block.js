import ExecutionInPin from "../ExecutionInPin";
import ExecutionOutPin from "../ExecutionOutPin";
import InputPin from "../InputPin";
import OutputPin from "../OutputPin";
import ArrayMap from "../../utils/ArrayMap";

import styles from './Block.scss';

export default class Block
{
  constructor(node, graph) {
    this.node = node;
    this.graph = graph;
    this.id = this.node.id;

    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.container = document.createElement('div');
    this.container.className = `block ${this.node.className.toLowerCase()}-block`;
    this.container.style = `min-width:${200}px; min-height:${60}px;`;

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    this.title.textContent = this.node.nodeName;

    this.dragArea = document.createElement('div');
    this.dragArea.className = 'drag-area';
    this.container.appendChild(this.dragArea)

    this.content = document.createElement('div');
    this.container.appendChild(this.content);

    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);


    this.dragArea.addEventListener('mousedown', this.dragstart);
    document.addEventListener('mouseup', this.dragstop);
  }

  added() {
    this.container.style.left = this.node.x +'px'
    this.container.style.top = this.node.y +'px'
  }

  destroy() {
    this.dragArea.removeEventListener('mousedown', this.dragstart);
    document.removeEventListener('mouseup', this.dragstop);
    document.removeEventListener('mousemove', this.dragmove)
  }

  dragstart(e) {
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
    this.container.style.left = x +'px'
    this.node.x = x;
  }

  set y(y) {
    this.container.style.top = y +'px'
    this.node.y = y;
  }

  get x() {
    return this.node.x;
  }

  get y() {
    return this.node.y;
  }

  get width() {
    return this.container.getClientRects().width
  }

  get height() {
    return this.container.getClientRects().height;
  }
}