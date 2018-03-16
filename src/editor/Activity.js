import LookUp from './LookUp';
import EventEmitter from '@/utils/EventEmitter'
import Stage from './Stage';

export default class Activity extends EventEmitter
{
  constructor() {
    super();

    this.id = API.generateActivityID();
    this.ownerID = Hub.currentUser.uid

    this.resources = new Map();
    this.lookUp = new LookUp(this);

    // always dirty when created, so user can save a blank activity if they want to
    this.dirty = true;
  }

  get isOwner() {
    return Hub.currentUser.uid == this.ownerID;
  }

  save(clearResource) {
    if(!this.isOwner || !this.dirty) return;

    let userFileRefs = this.getFileRefs();
    if(clearResource) this.cleanResource(userFileRefs);
    
    return API.saveActivity(this.pod(), userFileRefs).then(() => {
      this.dirty = false;
    })
  }

  /**
   * This extract all the necessary information for cloning the activity.
   * Send it to API
   * 
   * @returns 
   * @memberof Activity
   */
  clone() {
    // TODO: fix me !!!! not tested yet
    const id = API.generateActivityID();

    // generate files and fileRefs together
    let files = {};
    let fileRefs = {}
    for(let actor of this.lookUp.getActors()) {
      let userFiles = actor.getUserFiles()
      for(let fileData of userFiles) {
        // elminate the dupicate user files
        files[`${fileData.hash}.${fileData.ext}`] = {[id]: true}
        fileRefs[fileData.path] = true;
      }
    }

    let pod = this.lookUp.pod();
    pod.userID = Hub.currentUser.uid;
    pod.activityID = id;
    return API.cloneActivity(pod, files, fileRefs);
  }

  destroy() {
    super.destroy();
    this.clear();
    this.id = null;
    this.ownerID = null;
  }

  clear() {
    // TODO: clear resources necessary??
    this.resources.clear();
    this.lookUp.clear();
  }

  getFileRefs() {
    // get fileRefs from all actors(local memory of nodes and actor's brain variable)
    // it is used for cronjob to check against to decide whether to remove the actual file.
    //
    // also used for cleaning resource, remove any unused resources
    let fileRefs = {}
    for(let actor of this.lookUp.getActors()) {
      let userFiles = actor.getUserFiles();
      for(let fileData of userFiles) {
        fileRefs[fileData.path] = true;
      }
    }
    return fileRefs;
  }

  cleanResource(fileRefs) {
    let paths = this.resources.keys();
    for(let path of paths) {
      if(!(path in fileRefs)) {
        this.resources.delete(path);
      }
    }
  }

  pod() {
    let pod = this.lookUp.pod();
    pod.userID = this.ownerID;
    pod.activityID = this.id;
    return pod;
  }
}