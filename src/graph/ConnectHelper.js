import BlockMenu from './BlockMenu'

class ConnectHelper
{
  constructor() {
    this.svg = document.getElementById('svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
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
    if(e.target == this.path) {
      let connectParent = this.startPin.type == 'in';
      let menu = new BlockMenu();
      menu.init({
        connectParent,
        node: this.startPin.node.id,
        executionName: connectParent ? 'default' : this.startPin.name
      })
      menu.x = e.clientX;
      menu.y = e.clientY;
    }
    else {
      if(this.svg.contains(this.path)) {
        this.svg.removeChild(this.path);
      }
    }
  }

  startExecutionPin(pin, e) {
    this.path.setAttribute('stroke', '#FFF');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.svg.appendChild(this.path);
    this.drawLine(e.clientX, e.clientY, e.clientX, e.clientY);
    this.startPin = pin;
    this.dragType = 'execution'
  }

  startDataPin(pin, e) {
    this.path.setAttribute('stroke', '#a9c4d2');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.svg.appendChild(this.path);
    this.drawLine(e.clientX, e.clientY, e.clientX, e.clientY);
    this.startPin = pin;
    this.dragType = 'data'
  }

  connectExecutionPin(pin) {
    // You can only connect inpin to outpin or other way around.
    if(this.startPin.type == pin.type || this.dragType == 'data') return;

    let outPin = pin;
    let inPin = this.startPin;
    if(outPin.type == 'in') {
      outPin = this.startPin;
      inPin = pin;
    }

    History.push(Commander.create('CreateExecution', outPin.node.id, outPin.name, inPin.node.id).process());
  }

  connectDataPin(pin) {
    if(this.startPin.type == pin.type || this.dragType == 'execution') return;

    let outputPin = pin;
    let inputPin = this.startPin;
    if(outputPin.type == 'input') {
      outputPin = this.startPin;
      inputPin = pin;
    }

    History.push(Commander.create('CreateDataLink', inputPin.node.id, inputPin.name, outputPin.node.id, outputPin.name).process())
  }
}

export default new ConnectHelper();