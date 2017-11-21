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

  start(pin, e) {
    this.svg.appendChild(this.path);
    this.drawLine(e.clientX, e.clientY, e.clientX, e.clientY);
    this.startPin = pin;
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

  stop(e) {
    if(this.svg.contains(this.path)) {
      this.svg.removeChild(this.path);
    }
  }

  tryConnect(pin) {
    if(this.startPin.node == pin.node) return;

    // You can only connect inpin to outpin or other way around.
    if(this.startPin.type != pin.type) {
      let outPin = pin;
      let inPin = this.startPin;
      if(outPin.type == 'input') {
        outPin = this.startPin;
        inPin = pin;
      }

      let sourceNode = outPin.node;
      let targetNode = inPin.node;
      let targetParentNode = targetNode.parent;
      let oldTargetNode = sourceNode.execution.get(outPin.name);

      sourceNode.connectNext(targetNode, outPin.name)

      // Only need to refresh 4 nodes' execution pins. You could go further only
      // refresh specific out pin.
      this.graph.getBlock(sourceNode.id).refreshExecutionPins()
      this.graph.getBlock(targetNode.id).refreshExecutionPins()
      if(targetParentNode) this.graph.getBlock(targetParentNode.id).refreshExecutionPins()
      if(oldTargetNode) this.graph.getBlock(oldTargetNode.id).refreshExecutionPins()
    }
  }
}

export default new ConnectionHelper();