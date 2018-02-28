import './ConnectHelper.scss'

import AutoConnect from './AutoConnect';
import BlockBrowser from '../browser/BlockBrowser';
import SoundEffect from '@/SoundEffect';
import { isMobile } from '@/utils/utils';

export default class
{
  constructor(svg) {
    this.svg = svg
    this.path = document.createElementNS('http://www.w3.org/2000/svg','path');
    this.path.setAttribute('stroke-linecap', 'round');
    this.path.classList.add('symbol-indicator')

    this._startSymbol = null;
    this._snapSymbol = null;
  }

  get snapSymbol() {
    return this._snapSymbol;
  }

  get startSymbol() {
    return this._startSymbol;
  }

  get selectedSymbol() {
    return this._startSymbol;
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
    this._startSymbol = null;

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
      ActivityManager.history.push(command);
      AutoConnect.process(this.startSymbol, command.getCreatedNode());
    }
  }

  startExecutionSymbol(symbol) {
    if(isMobile && symbol == this.selectedSymbol) {
      this.stop();
      return;
    }
    
    this._startSymbol = symbol;
    this.path.setAttribute('stroke', '#c6d4f7');
    this.path.setAttribute('stroke-width', 4);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
    this.svg.appendChild(this.path);

    this.updateDashDirection(symbol);
    this.drawIndicator(symbol);
  }

  startDataSymbol(symbol) {
    if(isMobile && symbol == this.selectedSymbol) {
      this.stop();
      return;
    }

    this._startSymbol = symbol;
    this.path.setAttribute('stroke', symbol.hexColor);
    this.path.setAttribute('stroke-width', 3);
    this.path.setAttribute('stroke-opacity', 1);
    this.path.setAttribute('fill', 'transparent');
    this.svg.appendChild(this.path);

    this.updateDashDirection(symbol);
    this.drawIndicator(symbol);
  }

  updateDashDirection(symbol) {
    if(symbol.flow == 'in') {
      this.path.classList.add('symbol-indicator-reversed')
    }
    else {
      this.path.classList.remove('symbol-indicator-reversed')
    }
  }

  drawIndicator(symbol) {
    if(isMobile && symbol) {
      let p = symbol.position;

      if(symbol.flow == 'in') {
        this.path.setAttribute('d', `M${p.x},${p.y} l-50,0`);
      }
      else {
        this.path.setAttribute('d', `M${p.x},${p.y} l50,0`);
      }
    }
  }
}