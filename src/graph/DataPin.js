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
    // FIXME: hack for touches, get the pin from dom element
    this.icon.pin = this;
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

    this.pointerOver = this.pointerOver.bind(this)
    this.pointerOut = this.pointerOut.bind(this)

    this.pointerDown = this.pointerDown.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
    this.targetPointerUp = this.targetPointerUp.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);

    this.container.addEventListener('mouseover', this.pointerOver);
    this.container.addEventListener('mouseout', this.pointerOut);
    
    // add listener to icon prevent interfere with input field drag 
    this.icon.addEventListener('mousedown', this.pointerDown);
    this.icon.addEventListener('mouseup', this.targetPointerUp);
    this.icon.addEventListener('touchstart', this.pointerDown);
    this.icon.addEventListener('touchend', this.targetPointerUp);
    this.icon.addEventListener('contextmenu', this.onContextMenu);
  }

  get position() {
    let offset = this.svg.getBoundingClientRect();
    let rect = this.icon.getBoundingClientRect();
    return {
      x: (rect.left + rect.right)/2 - offset.left,
      y: (rect.top + rect.bottom)/2 - offset.top
    }
  }

  pointerDown(e) {
    ConnectHelper.snapTarget = null;
    // only left mouse
    if(e.which == 1 || e.which == 0) {

      ConnectHelper.startDataPin(this, e);
      
      document.addEventListener('mousemove', this.pointerMove);
      document.addEventListener('mouseup', this.pointerUp);
      document.addEventListener('touchmove', this.pointerMove);
      document.addEventListener('touchend', this.pointerUp);
    }
  }

  pointerUp(e) {
    // only left mouse
    if(e.which == 1 || e.which == 0) {
      document.removeEventListener('mousemove', this.pointerMove)
      document.removeEventListener('mouseup', this.pointerUp);
      document.removeEventListener('touchmove', this.pointerMove);
      document.removeEventListener('touchend', this.pointerUp);
      ConnectHelper.stop(e)
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

    let sx = e.clientX ? e.clientX : e.touches[0].clientX 
    let sy = e.clientY ? e.clientY : e.touches[0].clientY 
    ConnectHelper.drawLine(this.position.x, this.position.y, sx, sy);
  }

  pointerOver(e) {
    ConnectHelper.snapTarget = this;
  }

  pointerOut(e) {
    ConnectHelper.snapTarget = null;
  }

  targetPointerUp(e) {
    if(e.which == 1) {
      ConnectHelper.connectDataPin(this)
    }
    else if(e.which == 0){
      let touch = e.changedTouches[0];
      let target = document.elementFromPoint(touch.clientX, touch.clientY);
      if(target.pin) ConnectHelper.connectDataPin(target.pin)
    }
  }

  onContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
  }
}