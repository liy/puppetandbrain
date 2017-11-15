import ExecutionPin from "./ExecutionPin";

export default class ExecutionOutPin extends ExecutionPin
{
  constructor(name) {
    super(name, 'right')
    this.spot.style = `float:right; width:15px;height:10px; background-image: url(${require('../assets/execution-out-off.svg')}); cursor:pointer; margin-left:5px; margin-top:3px;`;

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#e1eaff');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
  }

  connect(pin) {
    if(typeof pin != ExecutionOutPin) {
      this.spot.style = `float:right; width:15px;height:10px; background-image: url(${require('../assets/execution-out-on.svg')}); cursor:pointer; margin-left:5px; margin-top:3px;`;
      // TODO: clean up
      pin.spot.style = `float:left; width:15px;height:10px; background-image: url(${require('../assets/execution-in-on.svg')}); cursor:pointer; margin-top:3px`;

      this.connectedPin = pin;
      pin.connectedPin = this;
      this.svg.appendChild(this.path);

      this.drawConnection();
    }
  }
  
  drawConnection() {
    if(!this.isConnected) return;

    let offsetX = 20;
    let dx = (this.connectedPin.position.x-offsetX) - (this.position.x+offsetX);
    let dy = this.connectedPin.position.y - this.position.y;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(dy, dx)*180/Math.PI;

    // console.log(dx, dy, degree, Math.sqrt(dx*dx+dy*dy) )

    // direct line:
    // 1. degree in range: [-?,?]
    // AND
    // 2. distance ?
    if(Math.abs(degree) < 45 && adx < 50 ) {
      this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 L${this.connectedPin.position.x-offsetX},${this.connectedPin.position.y} l${offsetX},0`);
    }
    else {
      if(dx >= 0) {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${ady/2},${dy/2} ${adx-ady},0 ${ady/2},${dy/2} L${this.connectedPin.position.x-offsetX},${this.connectedPin.position.y} l${offsetX},0`);
        }
        else {
          // dx with sign of dy
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${adx/2},${dxsdy/2}, 0,${(ady-adx)*Math.sign(dy)} ${adx/2},${dxsdy/2} L${this.connectedPin.position.x-offsetX},${this.connectedPin.position.y} l${offsetX},0`);
        }
      }
      else {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${-ady/2},${dy/2} ${-(adx-ady)},0 L${this.connectedPin.position.x-offsetX},${this.connectedPin.position.y} l${offsetX},0`);
        }
        else {
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${dx/2},${dxsdy/2} 0,${(ady-adx)*Math.sign(dy)} L${this.connectedPin.position.x-offsetX},${this.connectedPin.position.y} l${offsetX},0`);        
        }
      }
    }
  }
}