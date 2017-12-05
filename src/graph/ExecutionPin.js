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

    this.type = 'execution';
    this.flow = (location == 'left') ? 'in' : 'out';

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

    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseUpOnPin = this.mouseUpOnPin.bind(this);

    this.touchUp = this.touchUp.bind(this);
    this.touchDown = this.touchDown.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchUpOnPin = this.touchUpOnPin.bind(this);

    this.onContextMenu = this.onContextMenu.bind(this);
    
    this.container.addEventListener('mouseover', this.mouseOver);
    this.container.addEventListener('mouseout', this.mouseOut);
    this.container.addEventListener('mousedown', this.mouseDown);
    this.container.addEventListener('mouseup', this.mouseUpOnPin);

    this.container.addEventListener('touchstart', this.touchDown);
    this.container.addEventListener('touchend', this.touchUpOnPin);
    
    this.container.addEventListener('contextmenu', this.onContextMenu);
  }

  canConnect(pin) {
    return pin != null && (pin.type == this.type) && (pin.flow != this.flow);
  }

  mouseDown(e) {
    if(e.which == 1) {
      ConnectHelper.startExecutionPin(this, e);
      
      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
    }
  }

  touchDown(e) {
    ConnectHelper.startExecutionPin(this, e);
    
    document.addEventListener('touchmove', this.touchMove);
    document.addEventListener('touchend', this.touchUp);
  }

  mouseMove(e) {
    ConnectHelper.drawLine(e.clientX, e.clientY, this.position.x, this.position.y);
  }

  touchMove(e) {
    // TODO: double check the difference between e.changedTouches vs e.touches
    let touch = e.changedTouches[0];
    if(touch) {
      ConnectHelper.touchMove(touch);
      ConnectHelper.drawLine(touch.clientX, touch.clientY , this.position.x, this.position.y);
    }
  }

  touchUp(e) {
    document.removeEventListener('touchmove', this.touchMove);
    document.removeEventListener('touchend', this.touchUp);
    
    ConnectHelper.touchStop(e)
  }

  mouseUp(e) {
    // only left mouse
    if(e.which == 1) {
      document.removeEventListener('mousemove', this.mouseMove)
      document.removeEventListener('mouseup', this.mouseUp);

      ConnectHelper.stop(e)
    }
  }

  mouseOver(e) {
    ConnectHelper.mouseOver(this);
  }

  mouseOut(e) {
    ConnectHelper.mouseOut(this);
  }

  mouseUpOnPin(e) {
    // only left mouse
    if(e.which == 1) {
      ConnectHelper.connectExecutionPin(this)
    }
  }

  touchUpOnPin(e) {
    if(e.changedTouches) {
      let target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
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