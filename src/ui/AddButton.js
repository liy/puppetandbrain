import AddButtonIcon from '../assets/add-button-icon.svg';
import {svgElement} from '../utils/utils';
import PuppetBrowser from '../browser/PuppetBrowser';
import ControlButton from './ControlButton';

export default class AddActorButton extends ControlButton
{
  constructor() {
    super();
    this.element = document.getElementById('add-actor-button');
    this.element.style.visibility = 'visible';
    this.element.appendChild(svgElement(AddButtonIcon));

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      // History.push(Commander.create('CreateActor', ACTORS[Math.floor(Math.random()*ACTORS.length)]).processAndSave());

      var browser = new PuppetBrowser();
      browser.open()
    })
  }
}