import AutoConnect from './AutoConnect';
import BlockBrowser from '../browser/BlockBrowser';

class ConnectHelper
{
  constructor() {
    this.svg = document.getElementById('svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    
    this._snapSymbol = null;

    this.snapSound = new Audio(require('../assets/sounds/snap.mp3'))
  }

  get snapSymbol() {
    return this._snapSymbol;
  }

  touchMove(touch) {
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    // first time
    if(this.startSymbol && this.startSymbol.canConnect(target.symbol)) {
      // first time, play snap sound
      if(this._snapSymbol != target.symbol) this.snapSound.play();
      this._snapSymbol = target.symbol;
    }
    else {
      this._snapSymbol = null;
    }
  }

  mouseOver(symbol) {
    if(this.startSymbol && this.startSymbol.canConnect(symbol)) {
      this.snapSound.play();
    }
    this._snapSymbol = symbol;
  }

  mouseOut() {
    this._snapSymbol = null;
  }

  stop(e) {
    this._snapSymbol = null;
    this.startSymbol = null;

    if(this.svg.contains(this.path)) {
      this.svg.removeChild(this.path);
    }
  }

  async openBrowser(e) {
    if(e.target == BrainGraph.container) {
      var browser = new BlockBrowser();
      let createdNode = await browser.open(e.clientX, e.clientY);

      if(createdNode) AutoConnect.process(this.startSymbol, createdNode);
    }
  }

  async touchStop(e) {
    this._snapSymbol = null;

    let touch = e.changedTouches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    if(target == BrainGraph.container) {

      var browser = new BlockBrowser();
      let createdNode = await browser.open(touch.clientX, touch.clientY);

      // TODO: auto connect here
      if(createdNode) AutoConnect.process(this.startSymbol, createdNode);
    }

    if(this.svg.contains(this.path)) {
      this.svg.removeChild(this.path);
    }

    this.startSymbol = null;
  }

  startExecutionSymbol(symbol) {
    this.startSymbol = symbol;
    this.path.setAttribute('stroke', '#c6d4f7');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
    this.svg.appendChild(this.path);
  }

  startDataSymbol(symbol) {
    this.startSymbol = symbol;
    this.path.setAttribute('stroke', symbol.hexColor);
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
    this.svg.appendChild(this.path);
  }
}

export default new ConnectHelper();