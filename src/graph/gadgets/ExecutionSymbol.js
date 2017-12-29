export default class ExecutionSymbol
{
  constructor(flow) {
    this.type = 'execution';
    this.flow = flow;

    this.element = new DOMParser().parseFromString(require('../../assets/execution.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'execution-svg');
    this.element.setAttribute('width', 42);
    this.element.setAttribute('height', 22);

    this.inCircle = this.element.querySelector('#in-circle');
    this.outCircle = this.element.querySelector('#out-circle');

    if(flow == 'in') {
      this.inCircle.setAttribute('visibility', 'visible');
      this.outCircle.setAttribute('visibility', 'hidden');
    }
    else {
      this.inCircle.setAttribute('visibility', 'hidden');
      this.outCircle.setAttribute('visibility', 'visible');
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
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2
    }
  }
}