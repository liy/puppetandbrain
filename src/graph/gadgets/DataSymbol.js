export default class DataSymbol
{
  constructor(flow) {
    this.type = 'data';
    this.flow = flow;

    this.lineSVG = document.getElementById('svg');

    this.element = new DOMParser().parseFromString(require('../../assets/data-symbol.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'data-svg');
    this.element.setAttribute('width', 16);
    this.element.setAttribute('height', 16);

    this.circlePath = this.element.querySelector('#circle-path');

    if(flow == 'out') {
      this.circlePath.setAttribute('fill', '#98C6DE');
      this.circlePath.setAttribute('stroke', 'none');
    }
    
    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
      console.log(e)
    })

    this.visible = true;
  }

  get visible() {
    return this._visible;
  }

  set visible(v) {
    this._visible = v;
    if(v) {
      this.element.style.visibility = 'visible';
    }
    else {
      this.element.style.visibility = 'hidden';
    }
  }

  canConnect(symbol) {
    return symbol != null && (symbol.type == this.type) && (symbol.flow != this.flow);
  }
  
  get position() {
    let offset = this.lineSVG.getBoundingClientRect();
    let rect = this.circlePath.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}