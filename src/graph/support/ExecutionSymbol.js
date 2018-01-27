import ConnectHelper from '../ConnectHelper';

export default class ExecutionSymbol
{
  constructor(name, flow) {
    this.element = document.createElement('div');
    this.element.style.cursor = 'pointer';

    this.name = name;
    this.flow = flow;
    this.type = 'execution';

    this._offsetX = 0;
  }

  init(node) {
    this.node = node;

    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.element.addEventListener('mouseover', this.mouseOver);
    this.element.addEventListener('mouseout', this.mouseOut);
    this.element.addEventListener('mousedown', this.mouseDown);
    this.element.addEventListener('mouseup', this.mouseUp);

    this.touchUp = this.touchUp.bind(this);
    this.touchDown = this.touchDown.bind(this);
    this.element.addEventListener('touchstart', this.touchDown);
    this.element.addEventListener('touchend', this.touchUp);

    this.onContextMenu = this.onContextMenu.bind(this);
    this.element.addEventListener('contextmenu', this.onContextMenu);
  }

  canConnect(symbol) {
    return symbol != null && (symbol.type == this.type) && (symbol.flow != this.flow);
  }

  mouseDown(e) {
    e.stopPropagation();

    // only left mouse
    if(e.button < 2) {
      const move = e => {
        this.drawLineSnap(e.clientX, e.clientY);
      }

      const up = async e => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);

        if(e.target == BrainGraph.container) {
          await ConnectHelper.openBrowser(e.clientX, e.clientY);
        }
        ConnectHelper.stop(e);
      }

      ConnectHelper.startExecutionSymbol(this);
      this.drawLineSnap(e.clientX, e.clientY);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
  }

  touchDown(e) {
    e.stopPropagation();

    const move = e => {
      const touch = e.touches[0];
      let x = touch.clientX;
      let y = touch.clientY;
      // snap
      this.drawLineSnap(x, y);
      ConnectHelper.touchMove(touch);
    }

    const up = async e => {
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', up);

      if(e.target == BrainGraph.container) {
        await ConnectHelper.openBrowser(e.touches[0].clientX, e.touches[0].clientY);
      }
      ConnectHelper.stop(e);
    }

    ConnectHelper.startExecutionSymbol(this);
    this.drawLineSnap(e.touches[0].clientX, e.touches[0].clientY);
    document.addEventListener('touchmove', move);
    document.addEventListener('touchend', up);
  }

  touchUp(e) {
    // override this to make connection
  }

  mouseUp(e) {
    // override this to make connection
  }

  mouseOver(e) {
    ConnectHelper.mouseOver(this);
  }

  mouseOut(e) {
    ConnectHelper.mouseOut();
  }

  onContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  drawLineSnap(x, y) {
    // snap
    if(this.canConnect(ConnectHelper.snapSymbol)) {
      x = ConnectHelper.snapSymbol.position.x;
      y = ConnectHelper.snapSymbol.position.y;
    }
    this.drawLine(x, y, ConnectHelper.path);
  } 

  get offsetX() {
    return this._offsetX * BrainGraph.scale
  }

  drawLine(x, y, path) {
    let source = this.position;

    let sx = source.x - this.offsetX;
    let sy = source.y;

    let tx = x + this.offsetX;
    let ty = y;

    let dx = tx - sx;
    let dy = ty - sy;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy);
    let degree = Math.atan2(dy, dx)*180/Math.PI;

    if(Math.abs(degree) < 45 && adx < 50*BrainGraph.scale) {
      path.setAttribute('d', `M${source.x},${source.y} L${sx},${sy} ${tx},${ty} ${x},${y}`);
    }
    else {
      // horizontal
      if(adx > ady) {
        // dy with sign of dx
        let dysdx = ady*Math.sign(dx)
        path.setAttribute('d', `M${source.x},${source.y} L${sx},${sy} l${dysdx/2},${dy/2} H${tx-dysdx/2} L${tx},${ty} ${x},${y}`);
      }
      // vertical
      else {
        // dx with sign of dy
        let dxsdy = adx*Math.sign(dy)
        path.setAttribute('d', `M${source.x},${source.y} L${sx},${sy} l${dx/2},${dxsdy/2} V${ty-dxsdy/2} L${tx},${ty} ${x},${y}`);
      }
    }
  }
}