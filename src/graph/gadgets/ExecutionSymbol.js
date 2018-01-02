import Gadget from './Gadget';

export default class ExecutionSymbol extends Gadget
{
  constructor(flow) {
    super();

    this.type = 'execution';
    this.flow = flow;
    
    this.lineSVG = document.getElementById('svg');

    this.symbol = new DOMParser().parseFromString(require('../../assets/execution.svg'), "image/svg+xml").rootElement;
    this.symbol.setAttribute('class', 'execution-svg');
    this.symbol.setAttribute('width', 42);
    this.symbol.setAttribute('height', 22);
    this.element.appendChild(this.symbol)

    this.inCircle = this.symbol.querySelector('#in-circle');
    this.outCircle = this.symbol.querySelector('#out-circle');
    this.targetPath = null;

    if(flow == 'in') {
      this.inCircle.setAttribute('visibility', 'visible');
      this.outCircle.setAttribute('visibility', 'hidden');
      this.targetPath = this.inCircle;
    }
    else {
      this.inCircle.setAttribute('visibility', 'hidden');
      this.outCircle.setAttribute('visibility', 'visible');
      this.targetPath = this.outCircle;
    }

    this.connected = false;

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.element.addEventListener('mousedown', this.mouseDown);
    this.element.addEventListener('mouseup', this.mouseUp);
  }

  mouseDown(e) {
    e.stopPropagation();
  }

  mouseUp(e) {

  }

  canConnect(symbol) {
    return symbol != null && (symbol.type == this.type) && (symbol.flow != this.flow);
  }

  set connected(v) {
    this._connected = v;
    if(v) {
      this.inCircle.setAttribute('fill', '#D0E400');
    }
    else {
      this.inCircle.setAttribute('fill', 'none');
    }
  }

  get position() {
    let offset = this.lineSVG.getBoundingClientRect();
    let rect = this.targetPath.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2
    }
  }
}