require('./DataPin.scss')

import ConnectHelper from './ConnectHelper';

export default class DataPin
{
  constructor(block, name, location) {
    this.block = block;
    this.node = this.block.node;
    this.name = name;

    this.svg = document.getElementById('svg');

    this.container = document.createElement('div');
    this.container.className = 'data-pin';
    this.container.style = `float:${location}; clear:${location};`

    this.icon =  document.createElement('div');
    this.icon.className = 'icon'
    this.container.appendChild(this.icon);
    // this.icon.style = `${location}:5px`
    this.icon.style = `${location}:-22px`

    this.label = document.createElement('span');
    this.label.className = 'label'
    this.label.textContent = name;
    this.container.appendChild(this.label)
    // this.label.style = `float:${location}; margin-${location}:20px`;
    this.label.style = `float:${location}; margin-${location}:10px`


    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.targetMouseUp = this.targetMouseUp.bind(this);
    this.rightMouseDown = this.rightMouseDown.bind(this);

    this.icon.addEventListener('mousedown', this.mouseDown);
    this.icon.addEventListener('mouseup', this.targetMouseUp);
    this.icon.addEventListener('contextmenu', this.rightMouseDown);
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }

  mouseDown(e) {
    // only left mouse
    if(e.which != 1) return;

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);

    ConnectHelper.startDataPin(this, e);
  }

  mouseUp(e) {
    // only left mouse
    if(e.which != 1) return;

    document.removeEventListener('mousemove', this.mouseMove)
    document.removeEventListener('mouseup', this.mouseUp);
    ConnectHelper.stop(e)
  }

  mouseMove(e) {
    ConnectHelper.drawLine(this.position.x, this.position.y, e.clientX, e.clientY);
  }

  targetMouseUp(e) {
    // only left mouse
    if(e.which != 1) return;

    ConnectHelper.connectDataPin(this)
  }

  rightMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
  }
}