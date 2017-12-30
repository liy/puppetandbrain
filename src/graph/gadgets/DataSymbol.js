import Gadget from './Gadget';

export default class DataSymbol extends Gadget
{
  constructor(flow) {
    super();

    this.type = 'data';
    this.flow = flow;

    this.lineSVG = document.getElementById('svg');

    this.symbol = new DOMParser().parseFromString(require('../../assets/data-symbol.svg'), "image/svg+xml").rootElement;
    this.symbol.setAttribute('class', 'data-svg');
    this.symbol.setAttribute('width', 16);
    this.symbol.setAttribute('height', 16);
    this.element.appendChild(this.symbol);

    this.circlePath = this.symbol.querySelector('#circle-path');

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