import './PuppetBox.scss';
import GridBox from './GridBox';
import { svgElement } from '../utils/utils';

import Logo from '../assets/logo.svg';

export default class extends GridBox
{
  constructor(pod) {
    super();
    this.pod = pod;
    
    this.element.classList.add('puppet-box');

    this.box = document.createElement('div');
    this.box.className = 'box';
    this.box.style.backgroundRepeat = 'no-repeat';
    this.box.style.backgroundPosition = 'center';
    this.box.style.backgroundSize = 'contain';
    this.element.appendChild(this.box);

    this.title = document.createElement('span');
    this.title.className = 'title';
    this.title.textContent = pod.name
    this.element.appendChild(this.title);

    // load the file
    firebase.storage().ref(`users/${pod.userID}/snapshots/${pod.id}-puppet-snapshot`).getDownloadURL().then(url => {
      this.box.style.backgroundImage = `url("${url}")`
    })
  }
}