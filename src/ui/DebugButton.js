import StartButtonIcon from '../assets/play-button-icon.svg';
import StopButtonIcon from '../assets/stop-button-icon.svg';
import {svgElement} from '../utils/utils';
import ControlButton from './ControlButton';

export default class DebugButton extends ControlButton
{
  constructor(controller) {
    super(controller);
    this.element = document.getElementById('debug-button');

    this.enabled = false;
    Editor.stage.on('stage.actor.added', this.stageStateChange, this);
    Editor.stage.on('stage.actor.removed', this.stageStateChange, this);

    this.stopIcon = svgElement(StopButtonIcon, {width:100, height:100});
    this.startIcon = svgElement(StartButtonIcon, {width:100, height:100});
    this.element.appendChild(this.startIcon);

    Editor.on('game.start', () => {
      this.element.removeChild(this.element.firstChild);
      this.element.appendChild(this.stopIcon);
      this.element.setAttribute('data-title', 'Stop game')
    })

    Editor.on('game.stop', () => {
      this.element.removeChild(this.element.firstChild);
      this.element.appendChild(this.startIcon);
      this.element.setAttribute('data-title', 'Play game')
    })

    this.element.addEventListener('mousedown', e => {
      Editor.toggle();
    })
  }

  stageStateChange(actor) {
    this.enabled = !(Editor.stage.numActors == 0);
  }
}