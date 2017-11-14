import DataPin from "./DataPin";

export default class InputPin extends DataPin
{
  constructor(name) {
    super(name, 'input');
    
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#dbaee6');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.outputPin = null;
  }

  connect(outputPin) {
    if(outputPin.inputPins.indexOf(this) == -1) {
      outputPin.inputPins.push(this)
    }

    this.svg.appendChild(this.path);
    // make input pin aware that it is connected to this output pin
    this.outputPin = outputPin;
    // and redraw the line.
    this.drawConnection();
  }

  get isConnected() {
    return this.outputPin != null;
  }

  drawConnection() {
    if(!this.isConnected) return;

    let offsetX = -20;
    let dx = (this.outputPin.position.x-offsetX) - (this.position.x+offsetX);
    let dy = this.outputPin.position.y - this.position.y;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(dy, dx)*180/Math.PI;

    // console.log(dx, dy, degree, Math.sqrt(dx*dx+dy*dy) )

    // direct line:
    // 1. degree in range: [-?,?]
    // AND
    // 2. distance ?
    if(Math.abs(degree) < 45 && adx < 50 ) {
      this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 L${this.outputPin.position.x-offsetX},${this.outputPin.position.y} l${offsetX},0`);
    }
    else {
      if(dx >= 0) {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${ady/2},${dy/2} ${adx-ady},0 ${ady/2},${dy/2} L${this.outputPin.position.x-offsetX},${this.outputPin.position.y} l${offsetX},0`);
        }
        else {
          // dx with sign of dy
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${adx/2},${dxsdy/2}, 0,${(ady-adx)*Math.sign(dy)} ${adx/2},${dxsdy/2} L${this.outputPin.position.x-offsetX},${this.outputPin.position.y} l${offsetX},0`);
        }
      }
      else {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${-ady/2},${dy/2} ${-(adx-ady)},0 L${this.outputPin.position.x-offsetX},${this.outputPin.position.y} l${offsetX},0`);
        }
        else {
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${dx/2},${dxsdy/2} 0,${(ady-adx)*Math.sign(dy)} L${this.outputPin.position.x-offsetX},${this.outputPin.position.y} l${offsetX},0`);        
        }
      }
    }
  }
}