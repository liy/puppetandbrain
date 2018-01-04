require('./DebugButton.scss')

import StartSvg from '../assets/start.svg';
import StopSvg from '../assets/stop.svg';

import {svgElement} from '../utils/utils';

export default class DebugButton
{
  constructor() {
    this.element = document.getElementById('debug-button');
    this.element.style.visibility = 'visible';

    this.stopIcon = svgElement(StopSvg);
    this.startIcon = svgElement(StartSvg);

    this.element.appendChild(this.startIcon);

    Stage.on('game.start', () => {
      this.element.removeChild(this.element.firstChild);
      this.element.appendChild(this.stopIcon);
      this.element.title = 'Press F6 to stop'
    }, this)

    Stage.on('game.stop', () => {
      this.element.removeChild(this.element.firstChild);
      this.element.appendChild(this.startIcon);
      this.element.title = 'Press F6 to start'
    }, this)

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      Stage.toggle();
    })
  }
}