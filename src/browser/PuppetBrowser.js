import './PuppetBrowser.scss';
import ContentSection from './ContentSection';
import BrowserHeader from './BrowserHeader';

import PuppetBox from './PuppetBox'
import MyPuppetBox from './MyPuppetBox'
import Browser from './Browser';

import API from '../API';

export default class extends Browser
{
  constructor() {
    super();
    
    // TODO: to be removed when search is implemented
    this.header.searchField.element.style.visibility = 'hidden'

    this.element.classList.add('puppet-browser');

    this.contentSection.colorPalette = {
      'My Puppets': 0x4e84bf,
      'Puppets': 0x976bb8,
      'Widgets': 0xbd833c,
    }

    this.contentSection.placeholder = 'Loading, Please wait...☕'

    this.closed = false;
  }

  process() {
    API.listMyPuppets().then(pods => {
      if(this.closed) return;
      for(let pod of pods) {
        this.add(new MyPuppetBox(pod), 'My Puppets')
      }
    }).catch(error => {
      this.onError('Cannot load puppets, please try again...🤒', error)
    })

    API.listLibraryPuppets().then(pods => {
      if(this.closed) return;
      for(let pod of pods) {
        this.add(new PuppetBox(pod), 'Puppets')
      }
    }).catch(error => {
      this.onError('Cannot load puppets, please try again...🤒', error)
    })
  }

  add(box, category) {
    super.add(box, category)
    // if(box.isInViewport()) box.loadSnapshot();
    box.loadSnapshot();
    this.boxes.push(box);
    box.on('browser.close', this.close, this);
  }

  close(data) {
    super.close(data);
    this.closed = true;
  }
}