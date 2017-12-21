export default class ExecutionPinSVG
{
  constructor() {
    this.element = new DOMParser().parseFromString(require('../../assets/execution.svg'), "image/svg+xml").rootElement;
    this.element.setAttribute('class', 'execution-pin');
    this.element.setAttribute('width', 29);
    this.element.setAttribute('height', 22);

    this.colorPath = this.element.querySelector('#color');
    this.basePath = this.element.querySelector('#color');

    this.element.addEventListener('mousedown', e => {
      e.stopPropagation();
      console.log(e)
    })
  }

  set color(v) {
    this.colorPath.setAttribute('fill', v);
    this.colorPath.setAttribute('stroke', v);
  }
}