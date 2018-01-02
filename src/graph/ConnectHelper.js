import AutoConnect from './AutoConnect';
import BlockBrowser from '../browser/BlockBrowser';

class ConnectHelper
{
  constructor() {
    this.svg = document.getElementById('svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    
    this._snapSymbol = null;

    this.linkSound = new Audio(require('../assets/sounds/link.mp3'))
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
    console.warn('out')
    this._snapSymbol = null;
  }

  async stop(e) {
    this._snapSymbol = null;

    if(e.target == BrainGraph.container) {
      var browser = new BlockBrowser();
      let createdNode = await browser.open(e.clientX, e.clientY);

      if(createdNode) AutoConnect.process(this.startSymbol, createdNode);
    }

    if(this.svg.contains(this.path)) {
      this.svg.removeChild(this.path);
    }

    this.startSymbol = null;
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

  startExecutionPin(pin, e) {
    this.startSymbol = pin;
    this.path.setAttribute('stroke', '#c6d4f7');
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
    this.svg.appendChild(this.path);
  }

  startDataSymbol(symbol, e) {
    this.startSymbol = symbol;
    this.path.setAttribute('stroke', '#a9c4d2');
    this.path.setAttribute('stroke-width', 2);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
    this.svg.appendChild(this.path);
  }

  connectExecutionPin(pin) {
    // might happens
    if(this.startSymbol && this.startSymbol.canConnect(pin)) {
      let outPin = pin;
      let inPin = this.startSymbol;
      if(outPin.flow == 'in') {
        outPin = this.startSymbol;
        inPin = pin;
      }
  
      this.linkSound.play()
  
      History.push(Commander.create('CreateExecution', outPin.node.id, outPin.name, inPin.node.id).processAndSave());
    }
  }
}

export default new ConnectHelper();