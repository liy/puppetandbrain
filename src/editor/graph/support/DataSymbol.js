import './DataSymbol.scss';
import DataColor from '../../data/DataColor';
import DataType from '../../data/DataType';
import { isMobile } from '@/utils/utils';

export default class DataSymbol
{
  constructor(name, flow) {
    this.element = document.createElement('div');
    this.element.className = 'data-symbol';

    this._connected = false;

    this.name = name;
    this.flow = flow;
    this.type = 'data';

    // override this in input and output symbol
    this._offsetX = 0;
  }

  init(node) {
    this.node = node;

    // FIXME: hack for touches, get the symbol from dom element
    this.element.symbol = this;


    if(!isMobile) {  
      this.mouseOver = this.mouseOver.bind(this)
      this.mouseOut = this.mouseOut.bind(this)
      this.mouseDown = this.mouseDown.bind(this);
      this.mouseUp = this.mouseUp.bind(this);

      this.element.addEventListener('mouseover', this.mouseOver);
      this.element.addEventListener('mouseout', this.mouseOut);
      this.element.addEventListener('mousedown', this.mouseDown);
      this.element.addEventListener('mouseup', this.mouseUp);
    }

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

  refresh() {

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
          await BrainGraph.connectHelper.openBrowser(e.clientX, e.clientY);
        }
        BrainGraph.connectHelper.stop(e);
      }

      BrainGraph.connectHelper.startDataSymbol(this);
      this.drawLineSnap(e.clientX, e.clientY);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
  }

  touchDown(e) {
    // override this to make connection in touch mode
    BrainGraph.connectHelper.startDataSymbol(this);
  }

  touchUp(e) {
    // TODO: to be removed
    console.log('touch up')
  }

  mouseUp(e) {
    // override this to make connection
  }

  mouseOver(e) {
    BrainGraph.connectHelper.mouseOver(this);
  }

  mouseOut(e) {
    BrainGraph.connectHelper.mouseOut();
  }

  onContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  drawConnection() {
    if(BrainGraph.connectHelper.selectedSymbol == this) {
      BrainGraph.connectHelper.drawIndicator(this)
    }
  }

  
  drawLineSnap(x, y) {
    // snap
    if(this.canConnect(BrainGraph.connectHelper.snapSymbol)) {
      x = BrainGraph.connectHelper.snapSymbol.position.x;
      y = BrainGraph.connectHelper.snapSymbol.position.y;
    }
    this.drawLine(x, y, BrainGraph.connectHelper.path);
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

  get offsetX() {
    return this._offsetX * BrainGraph.scale
  }
  
  get position() {
    // override
    return null;
  }

  get color() {
    return 0;
  }

  get hexColor() {
    return `#${this.color.toString(16)}`
  }
}