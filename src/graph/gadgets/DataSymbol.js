export default class DataSymbol
{
  constructor(flow) {
    this.type = 'data';
    this.flow = flow;

    this.lineSVG = document.getElementById('svg');

    this.element = new DOMParser().parseFromString(require('../../assets/data-pin.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'data-svg');
    this.element.setAttribute('width', 29);
    this.element.setAttribute('height', 22);
  }

  canConnect(symbol) {
    return symbol != null && (symbol.type == this.type) && (symbol.flow != this.flow);
  }
  
  get position() {
    let offset = this.lineSVG.getBoundingClientRect();
    let rect = this.element.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}