import AddButtonIcon from '../assets/add-button-icon.svg';
import {svgElement} from '../utils/utils';
import PuppetBrowser from '../browser/PuppetBrowser';
import ControlButton from './ControlButton';
import BlockBrowser from '../browser/BlockBrowser';

export default class extends ControlButton
{
  constructor(controller) {
    super(controller);

    this.element = document.getElementById('add-actor-button');
    this.element.style.visibility = 'visible';
    this.element.appendChild(svgElement(AddButtonIcon, {width:120, height:120}));
    
    this.enabled = false;

    this.element.addEventListener('mousedown', async e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      if(this.mode == 'stage mode') {
        let browser = new PuppetBrowser();
        browser.open()
      }
      else {
        let browser = new BlockBrowser();
        let pod = await browser.open();
        if(pod) History.push(Commander.create('CreateBlock', pod, BrainGraph.brain.owner.id).processAndSave());
      }
    })
  }

  stageMode() {
    super.stageMode();
    this.element.setAttribute('data-title', "Add puppet");
  }

  brainMode() {
    super.brainMode();
    this.element.setAttribute('data-title', "Add block");
  }
}