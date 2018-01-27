import './PuppetBrowser.scss';
import ContentSection from './ContentSection';
import BrowserHeader from './BrowserHeader';

import PuppetBox from './PuppetBox'
import MyPuppetBox from './MyPuppetBox'
import Browser from './Browser';

import API from '../API';
import ImportActor from '../ImportActor';

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

    this.contentSection.placeholder = 'Loading, Please wait...☕'

    this.closed = false;
  }

  open() {
    document.body.appendChild(this.element);

    API.listMyPuppets().then(pods => {
      if(this.closed) return;
      for(let pod of pods) {
        this.add(new MyPuppetBox(pod), 'My Puppets')
      }
    })

    API.listLibraryPuppets().then(pods => {
      if(this.closed) return;
      for(let pod of pods) {
        this.add(new PuppetBox(pod), 'Puppets')
      }
    })
  }

  add(box, category) {
    super.add(box, category)
    // if(box.isInViewport()) box.loadSnapshot();
    box.loadSnapshot();
    this.boxes.push(box);
    box.on('browser.close', this.close, this);
  }

  close() {
    super.close();
    this.closed = true;
  }
}