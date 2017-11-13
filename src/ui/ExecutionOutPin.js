import ExecutionPin from "./ExecutionPin";

export default class ExecutionOutPin extends ExecutionPin
{
  constructor(name) {
    super(name, 'right')

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#FF0000');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('fill', 'transparent');
  }

  connect(pin) {
    if(typeof pin != ExecutionOutPin) {
      this.connectedPin = pin;
      pin.connectedPin = this;
      this.svg.appendChild(this.path);

      this.draw();
    }
  }
  
  draw() {
    if(!this.isConnected) return;

    // this.path.setAttribute('x1', this.connectedPin.position.x)
    // this.path.setAttribute('y1', this.connectedPin.position.y)
    // this.path.setAttribute('x2', this.position.x)
    // this.path.setAttribute('y2', this.position.y)

    // let r = Math.atan2(dy, dx)
    // console.log(r/(Math.PI/180) )
    
    let dx = (this.connectedPin.position.x-30) - (this.position.x+30);
    let dy = (this.connectedPin.position.y) - (this.position.y);
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);

    console.log(dx, dy)

    // if(dx < 0) {

    // }
    // else {
      if(adx > ady) {
        this.path.setAttribute('d', `M${this.position.x},${this.position.y} l30,0 ${dx/2-ady/2},0 ${ady},${dy} L${this.connectedPin.position.x-30},${this.connectedPin.position.y} ${this.connectedPin.position.x},${this.connectedPin.position.y}`);
      }
      else {
        if(dy<0) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l30,0 0,${dy/2+dx/2} ${dx},${-dx} L${this.connectedPin.position.x-30},${this.connectedPin.position.y} ${this.connectedPin.position.x},${this.connectedPin.position.y}`);
        }
        else {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l30,0 0,${dy/2-dx/2} ${dx},${dx} L${this.connectedPin.position.x-30},${this.connectedPin.position.y} ${this.connectedPin.position.x},${this.connectedPin.position.y}`);
        }
      }
    // }
  }
}