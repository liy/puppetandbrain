import ActivityLoader from "./ActivityLoader";
import { Resource } from "./resources/Resource";

window.Activity = {
  id: null,
  ownerID: null,

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
  },

  clone: async function() {
    let id = firebase.firestore().collection('activities').doc().id;

    let pod = LookUp.pod();
    pod.userID = CurrentUser.uid;
    pod.activityID = id;
    await API.saveActivity(pod);

    router.navigate(`/creations/${id}`)
  },

  update: function() {
    // TODO: make a clone instead
    if(this.ownerID !== CurrentUser.uid) {
      console.error('Cannot save')
      return;
    }

    let pod = LookUp.pod();
    pod.userID = CurrentUser.uid;
    pod.activityID = this.id;
    console.log('updating', pod.activityID)
    API.saveActivity(pod);
  },

  create: async function() {
    this.id = firebase.firestore().collection('activities').doc().id;
    let pod = LookUp.pod();
    this.ownerID = pod.userID = CurrentUser.uid;
    pod.activityID = this.id;
    console.log('creating', pod.activityID)
    await API.saveActivity(pod);

    router.navigate(`/creations/${this.id}`)
  },

  save: function(delay=true) {
    // only save when on in dev mode
    if(process.env.NODE_ENV !== 'dev') {
      if(this.id == null) {
        Activity.create();
      }
      else {
        Activity.update();
      }
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
}

document.addEventListener('keydown', e => {
  if(e.keyCode == 83 && e.ctrlKey) {
    e.preventDefault();
    
    if(Activity.id == null) {
      Activity.create();
    }
    else {
      Activity.update();
    }
  }
})
