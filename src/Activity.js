import ActivityLoader from "./ActivityLoader";
import { Resource } from "./resources/Resource";
import Delay from './switch/Delay'

const delaySave = new Delay();

window.Activity = {
  id: null,
  ownerID: null,
  isNew: false,

  load: async function(id) {
    // do not load the same activity twice, ie, after creation.
    if(this.id == id) return;

    let pod = await API.getActivity(id);
    this.id = id;
    this.ownerID = pod.userID;
    var loader = new ActivityLoader();
    loader.parse(pod);
  },

  new: function() {
    this.id = firebase.firestore().collection('activities').doc().id;
    this.isNew = true;
  },

  clone: async function() {
    // TODO: fix me !!!! not tested yet
    let id = firebase.firestore().collection('activities').doc().id;

    let pod = LookUp.pod();
    pod.userID = CurrentUser.uid;
    pod.activityID = id;
    await API.saveActivity(pod);

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

      if(this.id == null) {
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

    History.clear();
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
      for(let path of userFiles) {
        fileRefs[path] = true;
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

    Activity.save();
  }
})
