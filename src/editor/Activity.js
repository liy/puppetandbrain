import LookUp from './LookUp';
import ActivityLoader from "./ActivityLoader";
import EventEmitter from '@/utils/EventEmitter'

export default class Activity
{
  constructor(id, ownerID) {
    this.id = id;
    this.ownerID = ownerID

    this.resources = new Map();
    this.lookUp = new LookUp();
  }

  get canSave() {
    return CurrentUser.uid == this.ownerID;
  }

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
    pod.userID = CurrentUser.uid;
    pod.activityID = id;
    return API.clone(pod, files, fileRefs);
  }

  save() {
    let userFileRefs = Activity.getFileRefs();
    Activity.cleanResource(userFileRefs);

    if(Activity.isNew) {
      Activity.create(userFileRefs);
    }
    else {
      Activity.update(userFileRefs);
    }
  }

  clear() {
    // TODO: clear resources necessary??
    this.resources.clear();
    this.stage.clear();
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
}