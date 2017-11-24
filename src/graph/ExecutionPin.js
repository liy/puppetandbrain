require('./ExecutionPin.scss')

import ConnectHelper from './ConnectHelper';

/**
 * interaction drawing behaivour is in the out pin to in pin style
 */
export default class ExecutionPin
{
  constructor(block, name, location='left') {
    this.block = block;
    this.node = block.node;
    this.graph = this.block.graph;
    this.name = name;

    this.type = (location == 'left') ? 'in' : 'out';

    this.svg = document.getElementById('svg');

    this.container = document.createElement('div');
    this.container.className = 'execution-pin';

    this.icon =  document.createElement('div');
    this.icon.className = 'icon in-disconnected'
    this.container.appendChild(this.icon);
    // this.icon.style = `${location}:5px`
    this.icon.style = `${location}:-17px`

    this.label = document.createElement('div');
    this.label.className = 'label'
    this.label.textContent = (name == 'default') ? '' : name;
    this.container.appendChild(this.label)

    // this.label.style = `float:${location}; margin-${location}:20px`
    this.label.style = `float:${location}; margin-${location}:2px`

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.targetMouseUp = this.targetMouseUp.bind(this);
    this.rightMouseDown = this.rightMouseDown.bind(this);

    this.container.addEventListener('mousedown', this.mouseDown);
    this.container.addEventListener('mouseup', this.targetMouseUp);
    this.container.addEventListener('contextmenu', this.rightMouseDown);
  }

  mouseDown(e) {
    // only left mouse
    if(e.which != 1) return;

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);

    ConnectHelper.startExecutionPin(this, e);
  }

  mouseMove(e) {
    // TODO: create a temp link, between initial execution pin position to current mouse position
    ConnectHelper.drawLine(e.clientX, e.clientY, this.position.x, this.position.y);
  }

  mouseUp(e) {
    // only left mouse
    if(e.which != 1) return;

    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp);
    ConnectHelper.stop(e)
  }

  targetMouseUp(e) {
    // only left mouse
    if(e.which != 1) return;

    ConnectHelper.connectExecutionPin(this)
  }

  rightMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }
}