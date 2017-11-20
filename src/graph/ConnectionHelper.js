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

      // Remove existing, note that targetNode parent execution is set to null first. As the old next node's parent might be target node
      // Therefore, the target node's parent's next node must be set to null first
      // Then old next node parent is set to null
      // Finally, setup new connection
      if(targetNode.parent) {
        this.graph.getBlock(targetNode.parent.task.id).outPins.get(targetNode.parent.name).disconnect();
        targetNode.parent.task.execution.set(targetNode.parent.name, null);
      }
      let oldNextNode = sourceNode.execution.get(outPin.name);
      if(oldNextNode) {
        this.graph.getBlock(oldNextNode.id).inPin.disconnect();
        oldNextNode.parent = null;
      }

      sourceNode.execution.set(outPin.name, targetNode)
      targetNode.parent = {
        name: outPin.name,
        task: sourceNode
      }

      this.graph.refresh();
    }
  }
}

export default new ConnectionHelper();