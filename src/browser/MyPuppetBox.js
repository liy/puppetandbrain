import PuppetBox from './PuppetBox'

export default class extends PuppetBox
{
  constructor(pod) {
    super(pod)
  }

  loadSnapshot() {
    // load the file
    firebase.storage().ref(`users/${pod.userID}/snapshots/${pod.id}-puppet-snapshot`).getDownloadURL().then(url => {
      this.box.style.backgroundImage = `url("${url}")`
    })
  }
}