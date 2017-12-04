import ExecutionInPin from "../ExecutionInPin";
import ExecutionOutPin from "../ExecutionOutPin";
import InputPin from "../InputPin";
import OutputPin from "../OutputPin";
import ArrayMap from "../../utils/ArrayMap";
import BlockSelection from '../BlockSelection';

import styles from './Block.scss';

export default class Block
{
  constructor(node) {
    this.node = node;
    this.brain = this.node.brain;
    this.id = this.node.id;

    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.container = document.createElement('div');
    this.container.className = `block`;

    this.title = document.createElement('div');
    this.title.className = 'title'
    this.container.appendChild(this.title);
    this.title.textContent = this.node.nodeName;

    this.dragArea = document.createElement('div');
    this.dragArea.className = 'drag-area';
    this.container.appendChild(this.dragArea)

    this.content = document.createElement('div');
    this.content.className = `content ${this.node.className.toLowerCase()}-block`;
    this.container.appendChild(this.content);

    
    this.rows = [];

    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);
    this.showInputs = this.showInputs.bind(this);
    this.hideInputs = this.hideInputs.bind(this);

    document.addEventListener('mouseup', this.dragstop);
    this.dragArea.addEventListener('mousedown', this.dragstart);
    // stop right click on block
    this.dragArea.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      // TODO: show menu for the block
    })
    this.container.addEventListener('mouseover', this.showInputs)
    this.container.addEventListener('mouseout', this.hideInputs)

    // append block to stage
    BrainGraph.addBlock(this);
    this.container.style.left = this.node.x +'px'
    this.container.style.top = this.node.y +'px'
  }

  destroy() {
    this.container.removeEventListener('mouseover', this.showInputs)
    this.container.removeEventListener('mouseout', this.hideInputs)
    this.dragArea.removeEventListener('mousedown', this.dragstart);
    document.removeEventListener('mouseup', this.dragstop);
    document.removeEventListener('mousemove', this.dragmove);
    BrainGraph.removeBlock(this);
  }

  dragstart(e) {
    BlockSelection.select(this);


    this._dragOffset = {
      x: (this.container.getBoundingClientRect().left - e.clientX),
      y: (this.container.getBoundingClientRect().top - e.clientY)
    }
    document.addEventListener('mousemove', this.dragmove)

    this.moveCommand = Commander.create('MoveBlock', this);
  }

  dragstop(e) {
    document.removeEventListener('mousemove', this.dragmove);

    // Since dragstop is listening on document, have to make sure only the dragging block push the movecommand
    if(e.target == this.dragArea) {
      // process and push to history
      if(this.moveCommand) History.push(this.moveCommand.processAndSave());
    }
  }

  showInputs() {
    for(let inputPin of this.inputPins.getValues()) {
      inputPin.showInput();
    }
  }

  hideInputs() {
    for(let inputPin of this.inputPins.getValues()) {
      inputPin.hideInput();
    }
  }

  getRow(i) {
    if(!this.rows[i]) {
      this.rows[i] = document.createElement('div');
      this.rows[i].className = 'row';
      this.content.appendChild(this.rows[i]);
    }
    return this.rows[i]
  }

  dragmove(e) {
    // Make sure all of the values are in client coordincate system. Then apply a scale
    this.x = (e.clientX - BrainGraph.blockContainer.getBoundingClientRect().left + this._dragOffset.x)/BrainGraph.scale ;
    this.y = (e.clientY - BrainGraph.blockContainer.getBoundingClientRect().top + this._dragOffset.y)/BrainGraph.scale ;
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
  
  set minWidth(v) {
    this.content.style.minWidth = `${v}px`
  }

  set minHeight(v) {
    this.content.style.minHeight = `${v}px`
  }

  get className() {
    return this.__proto__.constructor.name;
  }
}