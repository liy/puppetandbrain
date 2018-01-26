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
  }

  open() {
    document.body.appendChild(this.element);

    // API.listMyPuppets().then(pods => {
    //   for(let pod of pods) {
    //     this.contentSection.add(new MyPuppetBox(pod), 'My Puppets')
    //   }
    // })

    API.listLibraryPuppets().then(pods => {
      for(let pod of pods) {
        let box = new PuppetBox(pod);
        this.contentSection.add(box, 'Puppets');
        box.loadSnapshot();
        box.on('box.selected', this.onSelected, this);
      }
    })
  }

  onSelected(box) {
    this.close();
    let importActor = new ImportActor();
    importActor.start(box.pod);
  }
}