import PuppetBox from './PuppetBox'

export default class extends PuppetBox
{
  constructor(pod) {
    super(pod)
  }

  loadSnapshot() {
    // load the file
    firebase.storage().ref(`users/${this.pod.userID}/snapshots/${this.pod.myPuppetID}-puppet-snapshot.png`).getDownloadURL().then(url => {
      this.box.style.backgroundImage = `url("${url}")`
    })
  }
}