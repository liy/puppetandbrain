import './ABlock.scss'
import BlockBody from '../gadgets/BlockBody';

export default class ABlock
{
  constructor({inputs, outputs, variables}) {
    this.inputs = inputs;
    this.outputs = outputs;
    this.variables = variables;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'a-block');

    this.outline = document.createElement('div');
    this.outline.className = 'outline normal'
    this.element.appendChild(this.outline);

    this.bodies = [];
    // always have main body
    this.createBody();
    
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

  createBody() {
    let body = new BlockBody();
    this.element.appendChild(body.element);
    this.bodies.push(body);

    return body;
  }

  get mainBody() {
    return this.bodies[0];
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