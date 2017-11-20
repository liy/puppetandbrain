class ConnectionHelper
{
  constructor() {
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#cddc39');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.svg = document.getElementById('svg');
  }

  init(graph) {
    this.graph = graph;
  }

  outPinDown() {
    this.svg.appendChild(this.path);
  }

  inPinUp() {
    this.svg.removeChild(this.path);
  }

  inPinDown() {
    this.svg.appendChild(this.path);
  }

  outPinUp() {

    this.svg.removeChild(this.path);
  }

  drawLine(x1, y1, x2, y2) {
    let offsetX = 20;
    let dx = (x1-offsetX) - (x2+offsetX);
    let dy = y1 - y2;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(dy, dx)*180/Math.PI;

    // direct line:
    // 1. degree in range: [-?,?]
    // AND
    // 2. distance ?
    if(Math.abs(degree) < 45 && adx < 50 ) {
      this.path.setAttribute('d', `M${x2},${y2} l${offsetX},0 L${x1-offsetX},${y1} l${offsetX},0`);
    }
    else {
      if(dx >= 0) {
        if(adx > ady) {
          this.path.setAttribute('d', `M${x2},${y2} l${offsetX},0 ${ady/2},${dy/2} ${adx-ady},0 ${ady/2},${dy/2} L${x1-offsetX},${y1} l${offsetX},0`);
        }
        else {
          // dx with sign of dy
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${x2},${y2} l${offsetX},0 ${adx/2},${dxsdy/2}, 0,${(ady-adx)*Math.sign(dy)} ${adx/2},${dxsdy/2} L${x1-offsetX},${y1} l${offsetX},0`);
        }
      }
      else {
        if(adx > ady) {
          this.path.setAttribute('d', `M${x2},${y2} l${offsetX},0 ${-ady/2},${dy/2} ${-(adx-ady)},0 L${x1-offsetX},${y1} l${offsetX},0`);
        }
        else {
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${x2},${y2} l${offsetX},0 ${dx/2},${dxsdy/2} 0,${(ady-adx)*Math.sign(dy)} L${x1-offsetX},${y1} l${offsetX},0`);
        }
      }
    }
  }
}

export default new ConnectionHelper();