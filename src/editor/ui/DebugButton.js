import StartButtonIcon from '@/assets/play-button-icon.svg';
import StopButtonIcon from '@/assets/stop-button-icon.svg';
import {svgElement} from '@/utils/utils';
import ControlButton from './ControlButton';
import SoundEffect from '@/SoundEffect';

export default class DebugButton extends ControlButton
{
  constructor(controller) {
    super(controller);
    this.element = document.getElementById('debug-button');

    this.enabled = false;
    this.activity.on('stage.actor.added', this.stageStateChange, this);
    this.activity.on('stage.actor.removed', this.stageStateChange, this);

    this.stopIcon = svgElement(StopButtonIcon, {width:100, height:100});
    this.startIcon = svgElement(StartButtonIcon, {width:100, height:100});
    this.element.appendChild(this.startIcon);

    this.activity.on('game.start', () => {
      this.element.removeChild(this.element.firstChild);
      this.element.appendChild(this.stopIcon);
      this.element.setAttribute('data-title', 'Stop game')
    })

    this.activity.on('game.stop', () => {
      this.element.removeChild(this.element.firstChild);
      this.element.appendChild(this.startIcon);
      this.element.setAttribute('data-title', 'Play game')
    })

    this.element.addEventListener('mousedown', e => {
      SoundEffect.play('click');
      
      Editor.toggle();
    })
  }

  stageStateChange(actor) {
    this.enabled = !(ActivityManager.stage.numActors == 0);
  }
}