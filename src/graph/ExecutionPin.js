require('./ExecutionPin.scss')

import ConnectionHelper from './ConnectionHelper';

/**
 * interaction drawing behaivour is in the out pin to in pin style
 */
export default class ExecutionPin
{
  constructor(node, name, location='left') {
    this.node = node;
    this.connectedPin = null;
    this.name = name;

    this.type = (location == 'left') ? 'input' : 'ouput';

    this.svg = document.getElementById('svg');

    this.container = document.createElement('div');
    this.container.className = 'execution-pin';

    this.icon =  document.createElement('div');
    this.icon.className = 'icon in-disconnected'
    this.container.appendChild(this.icon);
    this.icon.style = `${location}:5px`

    this.label = document.createElement('div');
    this.label.className = 'label'
    this.label.textContent = (name == 'default') ? '' : name;
    this.container.appendChild(this.label)

    this.label.style = `float:${location}; margin-${location}:20px`

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.targetMouseUp = this.targetMouseUp.bind(this);

    this.container.addEventListener('mousedown', this.mouseDown);
    this.container.addEventListener('mouseup', this.targetMouseUp);
  }

  mouseDown(e) {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);

    ConnectionHelper.start(this, e);
  }

  mouseMove(e) {
    // TODO: create a temp link, between initial execution pin position to current mouse position
    ConnectionHelper.drawLine(e.clientX, e.clientY, this.position.x, this.position.y);
  }

  mouseUp(e) {
    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp);
    ConnectionHelper.stop(e)
  }

  targetMouseUp(e) {
    ConnectionHelper.tryConnect(this)
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }

  get isConnected() {
    return this.connectedPin != null;
  }
}