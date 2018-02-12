import './MyPuppetBox.scss';
import PuppetBox from './PuppetBox'
import { svgElement } from '../utils/utils';
import BinIcon from '../assets/bin.svg';

export default class extends PuppetBox
{
  constructor(pod) {
    super(pod)

    this.deletBtn = svgElement(BinIcon, {width:24, height:24});
    this.box.appendChild(this.deletBtn)

    this.deletBtn.addEventListener('click', e => {
      e.stopPropagation();
      let confirm = window.confirm(`How you sure to delete ${pod.name}?`)
      if(confirm) {
        API.deleteMyPuppet(pod.myPuppetID).then(() => {
          this.emit('puppet.deleted', this);
        })
      }
    })
  }

  loadSnapshot() {
    // load the file
    firebase.storage().ref(`users/${this.pod.userID}/snapshots/${this.pod.myPuppetID}-puppet-snapshot.png`).getDownloadURL().then(url => {
      this.box.style.backgroundImage = `url("${url}")`
    })
  }
}