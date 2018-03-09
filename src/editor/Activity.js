import LookUp from './LookUp';
import ActivityLoader from "./ActivityLoader";
import EventEmitter from '@/utils/EventEmitter'
import Stage from './Stage';

export default class Activity extends EventEmitter
{
  constructor() {
    super();

    this.id = firebase.firestore().collection('activities').doc().id;
    this.ownerID = Hub.currentUser.uid

    this.resources = new Map();
    this.lookUp = new LookUp(this);

    this.dirty = false;
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
    let id = firebase.firestore().collection('activities').doc().id;

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