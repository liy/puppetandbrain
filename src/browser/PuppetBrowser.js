import './PuppetBrowser.scss';
import ContentSection from './ContentSection';
import BrowserHeader from './BrowserHeader';

import PuppetBox from './PuppetBox'
import Browser from './Browser';

import API from '../API';

export default class extends Browser
{
  constructor() {
    super();
    
    this.element.classList.add('puppet-browser');

    this.contentSection.colorPalette = {
      'My Puppets': 0x4e84bf,
      'Puppets': 0x976bb8,
      'Widgets': 0xbd833c,
    }
  }

  open() {
    document.body.appendChild(this.element);

    API.getPuppets().then(pods => {
      for(let pod of pods) {
        this.contentSection.add(new PuppetBox(pod), 'My Puppets')
      }
    })
  }
}