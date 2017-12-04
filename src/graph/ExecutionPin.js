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
    // FIXME: hack for touches, get the pin from dom element
    this.icon.pin = this;
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
    this.onContextMenu = this.onContextMenu.bind(this);
    
    this.container.addEventListener('touchenter', this.pointerOver);
    this.container.addEventListener('touchleave', this.pointerOut);
    this.container.addEventListener('mouseover', this.pointerOver);
    this.container.addEventListener('mouseout', this.pointerOut);

    this.container.addEventListener('touchstart', this.pointerDown);
    this.container.addEventListener('touchend', this.targetPointerUp);
    
    this.container.addEventListener('mousedown', this.pointerDown);
    this.container.addEventListener('mouseup', this.targetPointerUp);
    this.container.addEventListener('contextmenu', this.onContextMenu);
  }

  pointerDown(e) {
    ConnectHelper.snapTarget = null;
    // only left mouse
    if(e.which == 1 || e.which == 0) {
      ConnectHelper.startExecutionPin(this, e);
      
      document.addEventListener('mousemove', this.pointerMove);
      document.addEventListener('touchmove', this.pointerMove);
      document.addEventListener('touchend', this.pointerUp);
      document.addEventListener('mouseup', this.pointerUp);
    }
  }

  updateSnapTarget(e) {
    if(e.changedTouches) {
      let touch = e.changedTouches[0];
      let target = document.elementFromPoint(touch.clientX, touch.clientY);
      if(target.pin) {
        ConnectHelper.snapTarget = target.pin;
      }
      else {
        ConnectHelper.snapTarget = null;
      }
    }
  }

  pointerMove(e) {
    this.updateSnapTarget(e);

    // TODO: Handle touches
    let sx = e.clientX ? e.clientX : e.touches[0].clientX 
    let sy = e.clientY ? e.clientY : e.touches[0].clientY 
    // create a temp link, between initial execution pin position to current mouse position
    ConnectHelper.drawLine(sx, sy, this.position.x, this.position.y);
  }

  pointerUp(e) {
    // only left mouse
    if(e.which == 1 || e.which == 0) {
      
      document.removeEventListener('mousemove', this.pointerMove)
      document.removeEventListener('touchmove', this.pointerMove);
      document.removeEventListener('touchend', this.pointerUp);
      document.removeEventListener('mouseup', this.pointerUp);

      if(e.which == 1) {
        ConnectHelper.stop(e)
      }
      else {
        ConnectHelper.touchStop(e)
      }
    }
  }

  pointerOver(e) {
    ConnectHelper.snapTarget = this;
  }

  pointerOut(e) {
    ConnectHelper.snapTarget = null;
  }

  targetPointerUp(e) {
    // only left mouse
    if(e.which == 1) {
      ConnectHelper.connectExecutionPin(this)
    }
    else if(e.which == 0){
      let touch = e.changedTouches[0];
      let target = document.elementFromPoint(touch.clientX, touch.clientY);
      if(target.pin) ConnectHelper.connectExecutionPin(target.pin)
    }
  }

  onContextMenu(e) {
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