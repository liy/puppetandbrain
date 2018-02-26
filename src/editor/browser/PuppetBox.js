import './PuppetBox.scss';
import GridBox from './GridBox';
import { svgElement } from '@/utils/utils';
import Commander from '../commands/Commander'

import Logo from '@/assets/logo.svg';

export default class extends GridBox
{
  constructor(pod) {
    super();
    this.pod = pod;
    
    this.element.classList.add('puppet-box');

    this.box = document.createElement('div');
    this.box.className = 'box';
    this.element.appendChild(this.box);

    this.thumb = document.createElement('div')
    this.thumb.className = 'thumbnail';
    this.thumb.style.backgroundRepeat = 'no-repeat';
    this.thumb.style.backgroundPosition = 'center';
    this.thumb.style.backgroundSize = 'contain';
    this.box.appendChild(this.thumb);

    this.title = document.createElement('span');
    this.title.className = 'title';
    this.title.textContent = pod.name
    this.element.appendChild(this.title);

    this.element.addEventListener('click', async e => {
      // let importActor = new ImportActor();
      // importActor.start(pod);

      this.emit('browser.close');

      ActivityManager.history.push(await Commander.create('ImportActor', pod).process());
    })
  }

  loadSnapshot() {
    // load the snapshot
    firebase.storage().ref(`${this.pod.libDir}/${this.pod.puppetID}/snapshot.png`).getDownloadURL().then(url => {
      this.loaded = true;
      this.thumb.style.backgroundImage = `url("${url}")`
    })
  }
}