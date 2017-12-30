export default class ExecutionSymbol
{
  constructor(flow) {
    this.type = 'execution';
    this.flow = flow;
    
    this.lineSVG = document.getElementById('svg');

    this.element = new DOMParser().parseFromString(require('../../assets/execution.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'execution-svg');
    this.element.setAttribute('width', 42);
    this.element.setAttribute('height', 22);

    this.inCircle = this.element.querySelector('#in-circle');
    this.outCircle = this.element.querySelector('#out-circle');
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

    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
      console.log(e)
    })

    this.connected = false;
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