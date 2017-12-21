export default class ExecutionPinSVG
{
  constructor() {
    this.element = new DOMParser().parseFromString(require('../../assets/execution.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'execution-pin-svg');
    this.element.setAttribute('width', 29);
    this.element.setAttribute('height', 22);

    this.colorPath = this.element.querySelector('#color');
    this.basePath = this.element.querySelector('#base');

    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
      console.log(e)
    })

    this.connected = false;
  }

  set connected(v) {
    this._connected = v;
    if(v) {
      this.colorPath.setAttribute('fill', '#B3C400');
      this.colorPath.setAttribute('stroke', '#B3C400');
      this.colorPath.setAttribute('stroke-opacity', 1);
      this.colorPath.setAttribute('fill-opacity', 1);
      this.basePath.setAttribute('fill', '#D0E400');
      this.basePath.setAttribute('stroke', '#D0E400');
      this.basePath.setAttribute('fill-opacity', '1')
    }
    else {
      this.colorPath.setAttribute('fill', '#FFFFFF');
      this.colorPath.setAttribute('stroke', '#FFFFFF');
      this.colorPath.setAttribute('stroke-opacity', 0.8);
      this.colorPath.setAttribute('fill-opacity', 0.8);
      this.basePath.setAttribute('fill', '#BFBFBF');
      this.basePath.setAttribute('stroke', '#BFBFBF');
      this.basePath.setAttribute('fill-opacity', '0')
    }
  }
}