import AutoConnect from './AutoConnect';
import BlockBrowser from '../browser/BlockBrowser';
import SoundEffect from '../SoundEffect';

class ConnectHelper
{
  constructor() {
    this.svg = document.getElementById('graph-svg');
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    
    this._snapSymbol = null;
  }

  get snapSymbol() {
    return this._snapSymbol;
  }

  touchMove(touch) {
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    // first time
    if(this.startSymbol && this.startSymbol.canConnect(target.symbol)) {
      // first time, play snap sound
      if(this._snapSymbol != target.symbol) SoundEffect.snap.play();
      this._snapSymbol = target.symbol;
    }
    else {
      this._snapSymbol = null;
    }
  }

  mouseOver(symbol) {
    if(this.startSymbol && this.startSymbol.canConnect(symbol)) {
      SoundEffect.play('snap');
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

  /**
   * Quick node selection, creation and connection process
   * @param {Event} e Touch or Mouse event.
   */
  async openBrowser(x, y) {
    var browser = new BlockBrowser();
    let blockPod = await browser.open();
    if(blockPod) {
      blockPod.x = x;
      blockPod.y = y;
      let command = Commander.create('CreateBlock', blockPod, BrainGraph.brain.owner.id).processAndSave();
      History.push(command);
      AutoConnect.process(this.startSymbol, command.getCreatedNode());
    }
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