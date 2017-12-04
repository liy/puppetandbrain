import BlockMenu from '../browser/BlockMenu';
import AutoConnect from './AutoConnect';
import BlockBrowser from '../browser/BlockBrowser';

class ConnectHelper
{
  constructor() {
    this.svg = document.getElementById('svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    
    this.snapTarget = null;

    this.linkSound = new Audio(require('../assets/sounds/link.mp3'))
  }

  drawLine(x1, y1, x2, y2) {
    if(this.snapTarget) {
      if((this.snapTarget.type == 'input' && this.startPin.type == 'output') || (this.snapTarget.type == 'in' && this.startPin.type == 'out')) {
        x1 = this.snapTarget.position.x;
        y1 = this.snapTarget.position.y
      }
      else if((this.snapTarget.type == 'output' && this.startPin.type == 'input') || (this.snapTarget.type == 'out' && this.startPin.type == 'in')) {
        x2 = this.snapTarget.position.x
        y2 = this.snapTarget.position.y
      }
    }

    let offsetX = 8 * BrainGraph.scale;
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

  async stop(e) {
    if(e.target == BrainGraph.container) {

      var browser = new BlockBrowser();
      let createdNode = await browser.open(e.clientX, e.clientY);

      // TODO: auto connect here
      if(createdNode) AutoConnect.process(this.startPin, createdNode);
    }

    if(this.svg.contains(this.path)) {
      this.svg.removeChild(this.path);
    }
  }

  startExecutionPin(pin, e) {
    this.startPin = pin;
    this.path.setAttribute('stroke', '#c6d4f7');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.svg.appendChild(this.path);
    this.drawLine(e.clientX, e.clientY, e.clientX, e.clientY);
    this.dragType = 'execution'
  }

  startDataPin(pin, e) {
    this.startPin = pin;
    this.path.setAttribute('stroke', '#a9c4d2');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.svg.appendChild(this.path);
    this.drawLine(e.clientX, e.clientY, e.clientX, e.clientY);
    this.dragType = 'data'
  }

  connectExecutionPin(pin) {
    // might happens
    if(!this.startPin) return;
    // You can only connect inpin to outpin or other way around.
    if(this.startPin.type == pin.type || this.dragType == 'data') return;

    let outPin = pin;
    let inPin = this.startPin;
    if(outPin.type == 'in') {
      outPin = this.startPin;
      inPin = pin;
    }

    this.linkSound.play()

    History.push(Commander.create('CreateExecution', outPin.node.id, outPin.name, inPin.node.id).processAndSave());
  }

  connectDataPin(pin) {
    // might happens
    if(!this.startPin) return;
    if(this.startPin.type == pin.type || this.dragType == 'execution') return;

    let outputPin = pin;
    let inputPin = this.startPin;
    if(outputPin.type == 'input') {
      outputPin = this.startPin;
      inputPin = pin;
    }

    this.linkSound.play()

    History.push(Commander.create('CreateDataLink', inputPin.node.id, inputPin.name, outputPin.node.id, outputPin.name).processAndSave())
  }
}

export default new ConnectHelper();