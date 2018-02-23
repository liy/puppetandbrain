import ActivityLoader from "./ActivityLoader";
import { Resource } from "./resources/Resource";
import Delay from './access/Delay'
import NotificationControl from "./ui/NotificationControl";

const delaySave = new Delay();

window.Activity = {
  id: null,
  ownerID: null,
  isNew: false,

  load: async function(id) {
    // do not load the same activity twice, ie, after creation.
    if(this.id == id) return;

    // clear old activity if any...
    Activity.clear();

    let pod = await API.getActivity(id);
    this.id = id;
    this.ownerID = pod.userID;
    var loader = new ActivityLoader();
    return loader.parse(pod);
  },

  new: function() {
    this.id = firebase.firestore().collection('activities').doc().id;
    this.isNew = true;
  },

  clone: async function() {
    // TODO: fix me !!!! not tested yet
    let id = firebase.firestore().collection('activities').doc().id;

    // generate files and fileRefs together
    let files = {};
    let fileRefs = {}
    for(let actor of LookUp.getActors()) {
      let userFiles = actor.getUserFiles()
      for(let fileData of userFiles) {
        // elminate the dupicate user files
        files[`${fileData.hash}.${fileData.ext}`] = {[id]: true}
        fileRefs[fileData.path] = true;
      }
    }

    let pod = LookUp.pod();
    pod.userID = CurrentUser.uid;
    pod.activityID = id;
    await API.clone(pod, files, fileRefs);

    router.navigate(`/creations/${id}`)
  },

  update: function(fileRefs) {
    // TODO: make a clone instead
    if(this.ownerID !== CurrentUser.uid) {
      console.error('Cannot save')
      return;
    }

    let pod = LookUp.pod();
    pod.userID = CurrentUser.uid;
    pod.activityID = this.id;
    console.log('updating', pod.activityID)
    API.saveActivity(pod, fileRefs);
  },

  create: async function(fileRefs) {
    // no activity id cannot save
    if(!this.id) return;


    // no longer a new activity
    this.isNew = false;

    let pod = LookUp.pod();
    this.ownerID = pod.userID = CurrentUser.uid;
    pod.activityID = this.id;
    console.log('creating', pod.activityID)
    await API.saveActivity(pod, fileRefs);

    router.navigate(`/creations/${this.id}`)
  },

  autoSave: async function() {

    // do not auto save when in dev mode
    if(process.env.NODE_ENV !== 'dev') {  
      // delay save, just in case user has lots of actions...
      delaySave.cancel();
      await delaySave.wait(5000);

      // auto save does not clean resource
      // might be ok?
      let fileRefs = this.getFileRefs();

      if(Activity.isNew) {
        Activity.create(fileRefs);
      }
      else {
        Activity.update(fileRefs);
      }
    }
  },

  save: function() {
    let userFileRefs = Activity.getFileRefs();
    Activity.cleanResource(userFileRefs);

    if(Activity.isNew) {
      Activity.create(userFileRefs);
    }
    else {
      Activity.update(userFileRefs);
    }
  },

  /**
   * Call this when you want to navigate to another activity
   * Useful when treat activty as scene.
   */
  clear: function() {
    // TODO: clear resources necessary??
    Resource.clear();

    EditorHistory.clear();
    Editor.stage.clear();
    LookUp.clear();
  },

  getFileRefs: function() {
    // get fileRefs from all actors(local memory of nodes and actor's brain variable)
    // it is used for cronjob to check against to decide whether to remove the actual file.
    //
    // also used for cleaning resource, remove any unused resources
    let fileRefs = {}
    for(let actor of LookUp.getActors()) {
      let userFiles = actor.getUserFiles();
      for(let fileData of userFiles) {
        fileRefs[fileData.path] = true;
      }
    }
    return fileRefs;
  },

  cleanResource: function(fileRefs) {
    let paths = Resource.keys();
    for(let path of paths) {
      if(!(path in fileRefs)) {
        Resource.delete(path);
      }
    }
  }
}

document.addEventListener('keydown', e => {
  if(e.keyCode == 83 && e.ctrlKey) {
    e.preventDefault();

    NotificationControl.notify('Saving...').delayFadeoutRemove();

    Activity.save();
  }
})
