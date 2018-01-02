import './ABlock.scss'
import BlockBody from '../support/BlockBody';
import ArrayMap from '../../utils/ArrayMap';
import AOutputPin from '../support/AOutputPin';
import AInputPin from '../support/AInputPin';
import AExecutionInPin from '../support/AExecutionInPin';
import AExecutionOutPin from '../support/AExecutionOutPin';

export default class ABlock
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'a-block';

    this.title = document.createElement('div');
    this.title.className = 'a-title';
    this.element.appendChild(this.title);

    this.body = new BlockBody();
    this.element.appendChild(this.body.element);
    
    this.dragstart = this.dragstart.bind(this);
    this.dragstop = this.dragstop.bind(this);
    this.dragmove = this.dragmove.bind(this);
    this.element.addEventListener('mousedown', this.dragstart);
    this.element.addEventListener('touchstart', this.dragstart);
    document.addEventListener('mouseup', this.dragstop);
    document.addEventListener('touchend', this.dragstop);

    this.x = Math.random()*window.innerWidth;
    this.y = Math.random()*window.innerHeight;
  }

  init({name, hasIn, executionNames, inputNames, outputNames, node}) {
    this.node = node;
    this.inPin = null;
    this.outPins = new ArrayMap();
    this.inputPins = new ArrayMap();
    this.outputPins = new ArrayMap();

    this.title.textContent = name || 'test';

    let pin = null;
    if(hasIn) {
      this.inPin = new AExecutionInPin(node, '');
      this.body.addLeft(this.inPin);
    }

    for(let name of executionNames) {
      pin = new AExecutionOutPin(node, name);
      this.body.addRight(pin);
      this.outPins.set(name, pin)
    }

    for(let name of inputNames) {
      pin = new AInputPin(node, name);
      this.body.addLeft(pin);
      this.inputPins.set(name, pin);
    }

    for(let name of outputNames) {
      pin = new AOutputPin(node, name);
      this.body.addRight(pin);
      this.outputPins.set(name, pin);
    }
  }

  dragstart(e) {
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    this._dragOffset = {
      x: (this.element.getBoundingClientRect().left - sx),
      y: (this.element.getBoundingClientRect().top - sy)
    }
    document.addEventListener('mousemove', this.dragmove)
    document.addEventListener('touchmove', this.dragmove)

    // bring to front 
    this.element.parentElement.appendChild(this.element);
  }

  dragstop(e) {
    document.removeEventListener('mousemove', this.dragmove);
    document.removeEventListener('touchmove', this.dragmove);

    // Since dragstop is listening on document, have to make sure only the dragging block push the movecommand
    if(e.target == this.dragArea) {
      // process and push to history
      if(this.moveCommand) History.push(this.moveCommand.processAndSave());
    }
  }

  dragmove(e) {
    let sx = e.clientX ? e.clientX : e.touches[0].clientX;
    let sy = e.clientY ? e.clientY : e.touches[0].clientY;
    // Make sure all of the values are in client coordincate system. Then apply a scale
    this.x = (sx - BrainGraph.blockContainer.getBoundingClientRect().left + this._dragOffset.x)/BrainGraph.scale;
    this.y = (sy - BrainGraph.blockContainer.getBoundingClientRect().top + this._dragOffset.y)/BrainGraph.scale;
  }

  set x(x) {
    this.element.style.left = x +'px'
  }

  set y(y) {
    this.element.style.top = y +'px'
  }
}