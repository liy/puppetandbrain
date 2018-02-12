import './MyPuppetBox.scss';
import PuppetBox from './PuppetBox'
import { svgElement } from '../utils/utils';
import BinIcon from '../assets/bin.svg';
import ConfirmModal from '../ui/ConfirmModal';

export default class extends PuppetBox
{
  constructor(pod) {
    super(pod)

    this.deletBtn = svgElement(BinIcon, {width:24, height:24});
    this.box.appendChild(this.deletBtn)

    this.deletBtn.addEventListener('click', async e => {
      e.stopPropagation();
      
      let {action} = await ConfirmModal.open(`You are about to delete ${pod.name}. This action cannot be undone.`);
      if(action) {
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