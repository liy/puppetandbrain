class ConnectionHelper
{
  constructor() {
    this.svg = document.getElementById('svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
  }

  init(graph) {
    this.graph = graph;
    this.brain = this.graph.brain;
  }

  startExecutionPin(pin, e) {
    this.path.setAttribute('stroke', '#cddc39');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.svg.appendChild(this.path);
    this.drawLine(e.clientX, e.clientY, e.clientX, e.clientY);
    this.startPin = pin;
  }

  startDataPin(pin, e) {
    this.path.setAttribute('stroke', '#a9c4d2');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

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

  tryConnectExecution(pin) {
    // You can only connect inpin to outpin or other way around.
    if(this.startPin.type == pin.type) return;

    let outPin = pin;
    let inPin = this.startPin;
    if(outPin.type == 'in') {
      outPin = this.startPin;
      inPin = pin;
    }

    let sourceNode = outPin.node;
    let targetNode = inPin.node;
    // old target will have the execution pin disconnected
    let oldTargetNode = sourceNode.execution.get(outPin.name);

    sourceNode.connectNext(targetNode, outPin.name)

    // Only need to refresh 4 nodes' execution pins. You could go further only
    // refresh specific out pin.
    this.graph.getBlock(sourceNode.id).refreshExecutionPins()
    this.graph.getBlock(targetNode.id).refreshExecutionPins()
    if(oldTargetNode) this.graph.getBlock(oldTargetNode.id).refreshExecutionPins()
  }

  tryConnectData(pin) {
    if(this.startPin.type == pin.type) return;

    let outputPin = pin;
    let inputPin = this.startPin;
    if(outputPin.type == 'input') {
      outputPin = this.startPin;
      inputPin = pin;
    }

    let pointer = inputPin.node.inputs.get(inputPin.name);
    let outputNode = pointer.outputNode;

    this.brain.connectVariable(inputPin.node, inputPin.name, outputPin.node, outputPin.name);

    // Refresh the removed old output pin.
    if(outputNode) {
      let block = this.graph.getBlock(outputNode.id);
      block.outputPins.get(pointer.outputName).refresh();
    }

    inputPin.refresh();
    outputPin.refresh();
  }
}

export default new ConnectionHelper();