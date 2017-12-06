import ExecutionPin from "./ExecutionPin";
import ConnectHelper from './ConnectHelper';

export default class ExecutionOutPin extends ExecutionPin
{
  constructor(block, executionName) {
    super(block, executionName, 'right');

    this.icon.className += ' out-disconnected';

    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke', '#d0e400');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');

    this.path.addEventListener('mousedown', e => {
      console.log('test line interaction')
    })

    this.node.on('task.start', task => {
      this.path.setAttribute('stroke', '#ffee00');
      setTimeout(() => {
        this.path.setAttribute('stroke', '#d0e400');
      }, 500);
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

    // Note the brain graph scale!!!!
    let offsetX = 8 * BrainGraph.scale;
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

  onContextMenu(e) {
    super.onContextMenu(e)

    History.push(Commander.create('RemoveExecution', this.node, this.name).processAndSave());
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      // ignore the last operand, just some trial and error offset
      x: (rect.left + rect.right)/2 - offset.left + 3*BrainGraph.scale,
      y: (rect.top + rect.bottom)/2 - offset.top 
    }
  }
}