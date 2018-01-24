import './PuppetBrowser.scss';
import ContentSection from './ContentSection';
import BrowserHeader from './BrowserHeader';

import PuppetBox from './PuppetBox'
import Browser from './Browser';

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

    for(let i=0; i<10; ++i) {
      this.contentSection.add(new PuppetBox('test'), 'My Puppets');
    }

    
    for(let i=0; i<5; ++i) {
      this.contentSection.add(new PuppetBox('test'), 'Puppets');
    }
  }
}