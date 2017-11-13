import ExecutionPin from "./ExecutionPin";

export default class ExecutionOutPin extends ExecutionPin
{
  constructor(name) {
    super(name, 'right')

    this.linePath = document.createElementNS('http://www.w3.org/2000/svg','line');
    this.linePath.setAttribute('stroke', '#FF0000');
    this.linePath.setAttribute('stroke-width', 3);
    this.linePath.setAttribute('fill', 'transparent');
  }

  connect(pin) {
    if(typeof pin != ExecutionOutPin) {
      this.connectedPin = pin;
      pin.connectedPin = this;
      this.svg.appendChild(this.linePath);

      this.draw();
    }
  }
  
  draw() {
    if(!this.isConnected) return;

    this.linePath.setAttribute('x1', this.connectedPin.position.x)
    this.linePath.setAttribute('y1', this.connectedPin.position.y)
    this.linePath.setAttribute('x2', this.position.x)
    this.linePath.setAttribute('y2', this.position.y)
  }
}