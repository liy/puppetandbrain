import ExecutionPin from "./ExecutionPin";
import ConnectHelper from './ConnectHelper';

export default class ExecutionOutPin extends ExecutionPin
{
  constructor(block, executionName) {
    super(block, executionName, 'right');

    this.icon.className += ' out-disconnected';

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#cddc39');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.path.addEventListener('mousedown', e => {
      console.log('test line interaction')
    })
  }

  getConnectedPin() {
    let targetTask = this.node.execution.get(this.name);
    if(!targetTask) return null;

    let block = BrainGraph.getBlock(targetTask.id);
    return block.inPin
  }

  get isConnected() {
    return this.getConnectedPin() != null;
  }

  refresh() {
    if(this.isConnected) {
      this.icon.className = 'icon out-connected';
      this.svg.appendChild(this.path);
      this.drawConnection();
    }
    else {
      this.icon.className = 'icon out-disconnected';
      if(this.svg.contains(this.path)) this.svg.removeChild(this.path);
    }
  }

  drawConnection() {
    let connectedPin = this.getConnectedPin();
    if(!connectedPin) return;

    let offsetX = 10;
    let dx = (connectedPin.position.x-offsetX) - (this.position.x+offsetX);
    let dy = connectedPin.position.y - this.position.y;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(dy, dx)*180/Math.PI;

    // direct line:
    // 1. degree in range: [-?,?]
    // AND
    // 2. distance ?
    if(Math.abs(degree) < 45 && adx < 50 ) {
      this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 L${connectedPin.position.x-offsetX},${connectedPin.position.y} l${offsetX},0`);
    }
    else {
      if(dx >= 0) {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${ady/2},${dy/2} ${adx-ady},0 ${ady/2},${dy/2} L${connectedPin.position.x-offsetX},${connectedPin.position.y} l${offsetX},0`);
        }
        else {
          // dx with sign of dy
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${adx/2},${dxsdy/2}, 0,${(ady-adx)*Math.sign(dy)} ${adx/2},${dxsdy/2} L${connectedPin.position.x-offsetX},${connectedPin.position.y} l${offsetX},0`);
        }
      }
      else {
        if(adx > ady) {
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${-ady/2},${dy/2} ${-(adx-ady)},0 L${connectedPin.position.x-offsetX},${connectedPin.position.y} l${offsetX},0`);
        }
        else {
          let dxsdy = adx*Math.sign(dy)
          this.path.setAttribute('d', `M${this.position.x},${this.position.y} l${offsetX},0 ${dx/2},${dxsdy/2} 0,${(ady-adx)*Math.sign(dy)} L${connectedPin.position.x-offsetX},${connectedPin.position.y} l${offsetX},0`);
        }
      }
    }
  }

  rightMouseDown(e) {
    super.rightMouseDown(e)

    History.push(Commander.create('RemoveExecution', this.node, this.name).process());
  }
}