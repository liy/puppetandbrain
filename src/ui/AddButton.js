import AddButtonIcon from '../assets/add-button-icon.svg';
import {svgElement} from '../utils/utils';
import PuppetBrowser from '../browser/PuppetBrowser';
import ControlButton from './ControlButton';
import BlockBrowser from '../browser/BlockBrowser';

export default class AddActorButton extends ControlButton
{
  constructor(controller) {
    super(controller);

    this.element = document.getElementById('add-actor-button');
    this.element.style.visibility = 'visible';
    this.element.appendChild(svgElement(AddButtonIcon));

    this.element.addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      if(this.mode == 'stage mode') {
        let browser = new PuppetBrowser();
        browser.open()
      }
      else {
        let browser = new BlockBrowser();
        browser.open();
      }
    })
  }
}