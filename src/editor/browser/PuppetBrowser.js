import './PuppetBrowser.scss';
import ContentSection from './ContentSection';
import BrowserHeader from './BrowserHeader';

import PuppetBox from './PuppetBox'
import MyPuppetBox from './MyPuppetBox'
import Browser from './Browser';

import API from '@/API';

export default class extends Browser
{
  constructor() {
    super();
    
    // TODO: to be removed when search is implemented
    this.header.searchField.element.style.visibility = 'hidden'

    this.element.classList.add('puppet-browser');

    // TODO: put it into css
    this.contentSection.colorPalette = {
      'My Puppets': 0x4e84bf,
      'Animations': 0x976bb8,
      'Widgets': 0x6d9409,
      'Images': 0xa02d6b,
    }

    this.contentSection.placeholder = 'Loading, Please wait...☕'
  }

  process() {
    let p1 = API.listMyPuppets().then(pods => {
      if(this.closed) return;
      for(let pod of pods) {
        this.add(new MyPuppetBox(pod), 'My Puppets')
      }
    }).catch(error => {
      this.onError('Cannot load puppets, please try again...🤒', error)
    })

    let p2 = API.listLibraryPuppets().then(pods => {
      if(this.closed) return;
      for(let pod of pods) {
        this.add(new PuppetBox(pod), pod.category || 'Puppets')
      }
    }).catch(error => {
      this.onError('Cannot load puppets, please try again...🤒', error)
    })

    Promise.all([p1, p2]).then(() => {
      this.element.dispatchEvent(new CustomEvent('browser.content.ready', {detail:this, bubbles:true}));
    })
  }

  add(box, category) {
    super.add(box, category)
    // if(box.isInViewport()) box.loadSnapshot();
    box.loadSnapshot();
    this.boxes.push(box);
    box.on('browser.close', this.close, this);
    box.on('puppet.deleted', this.puppetedDeleted, this);
  }


  puppetedDeleted(box) {
    let index = this.boxes.indexOf(box);
    this.boxes.splice(index, 1);
    box.element.parentElement.removeChild(box.element);
    box.destroy();
  }
}