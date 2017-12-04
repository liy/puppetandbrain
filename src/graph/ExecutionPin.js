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
    this.icon.style = `${location}:-26px`

    this.label = document.createElement('div');
    this.label.className = 'label'
    this.label.textContent = (name == 'default') ? '' : name;
    this.container.appendChild(this.label)

    // this.label.style = `float:${location}; margin-${location}:20px`
    this.label.style = `float:${location}; margin-${location}:10px`

    this.pointerOver = this.pointerOver.bind(this)
    this.pointerOut = this.pointerOut.bind(this)
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
    this.targetPointerUp = this.targetPointerUp.bind(this);
    this.rightMouseDown = this.rightMouseDown.bind(this);

    
    // document.addEventListener('touchmove', (e => {
    //   console.log('!!!!')
    // }));

    
    this.container.addEventListener('mouseover', this.pointerOver);
    this.container.addEventListener('mouseout', this.pointerOut);

    this.container.addEventListener('touchstart', this.pointerDown);
    this.container.addEventListener('touchend', this.targetPointerUp);
    
    this.container.addEventListener('mousedown', this.pointerDown);
    this.container.addEventListener('mouseup', this.targetPointerUp);
    this.container.addEventListener('contextmenu', this.rightMouseDown);
  }

  pointerDown(e) {
    console.log(e)
    // only left mouse
    if(e.which != 1 && e.which != 0) return;

    ConnectHelper.startExecutionPin(this, e);
    
    document.addEventListener('mousemove', this.pointerMove);
    document.addEventListener('touchmove', this.pointerMove);
    document.addEventListener('touchup', this.pointerUp);
    document.addEventListener('mouseup', this.pointerUp);
  }

  pointerMove(e) {
    e.preventDefault();
    // TODO: Handle touches
    let sx = e.clientX ? e.clientX : e.touches[0].clientX 
    let sy = e.clientY ? e.clientY : e.touches[0].clientY 
    // create a temp link, between initial execution pin position to current mouse position
    ConnectHelper.drawLine(sx, sy, this.position.x, this.position.y);
  }

  pointerUp(e) {
    // only left mouse
    if(e.which != 1 && e.which != 0) return;

    document.removeEventListener('mousemove', this.pointerMove)
    document.removeEventListener('touchmove', this.pointerMove);
    document.removeEventListener('touchup', this.pointerUp);
    document.removeEventListener('mouseup', this.pointerUp);
    ConnectHelper.stop(e)
  }

  pointerOver(e) {
    ConnectHelper.snapTarget = this;
  }

  pointerOut(e) {
    ConnectHelper.snapTarget = null;
  }

  targetPointerUp(e) {
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
      y: (rect.top + rect.bottom)/2
    }
  }
}