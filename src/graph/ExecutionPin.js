require('./ExecutionPin.scss')

import ConnectionHelper from './ConnectionHelper';

export default class ExecutionPin
{
  constructor(name, location='left') {
    this.connectedPin = null

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

    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);

    this.container.addEventListener('mousedown', this.mousedown);
    this.container.addEventListener('mouseup', this.mouseup);
  }

  mousedown(e) {
    document.addEventListener('mousemove', this.mousemove);
  }

  mousemove(e) {
    // TODO: create a temp link, between initial execution pin position to current mouse position
    ConnectionHelper.drawLine(this.position.x, this.position.y, e.clientX, e.clientY)
  }

  mouseup(e) {
    document.removeEventListener('mousemove', this.mousemove)
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