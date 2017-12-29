export default class DataSymbol
{
  constructor(flow) {
    this.type = 'data';
    this.flow = flow;

    this.lineSVG = document.getElementById('svg');

    this.element = new DOMParser().parseFromString(require('../../assets/data-symbol.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'data-svg');
    this.element.setAttribute('width', 15);
    this.element.setAttribute('height', 15);

    if(flow == 'out') {
      this.element.setAttribute('width', 12);
      this.element.setAttribute('height', 12);
    }
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