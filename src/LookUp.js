// import shortid from 'shortid';
import Task from './nodes/Task';
import Delay from './switch/Delay';

// var STORE = Object.create(null);
var STORE = {};
var ACTORS = [];
var NODES = [];
var POINTERS = [];
var BRAINS = [];
// brain variable and actor properties
var VARIABLES = [];

var activityID = null;
var ownerID = null;
var creating = false;

var delaySave = new Delay();

function create(entry, id) {
  if(!id) {
    // naive way, better to use hash(random + timestamp + machine name + etc).
    while(true) {
      id = Math.floor(Math.random() * 999)+1;
      if(!STORE[id]) break;
    }

    // id = shortid.generate();
  }
  STORE[id] = entry;
  return id;
}

document.addEventListener('keydown', e => {
  if(e.keyCode == 83 && e.ctrlKey) {
    e.preventDefault();
    // save now!
    LookUp.save(false);
  }
})

window.LookUp = {
  store: STORE,
  user: null,

  setOwnerID: function(id) {
    ownerID = id;
  },

  setActivityID: function(id) {
    activityID = id;
    document.getElementById('activity-id').textContent = activityID;
  },

  save: async function(delay=true) {
    if(!this.user.uid) {
      console.error('User id cannot be null', this.user.uid); 
      return;
    }

    if(delay) {
      // Wait for 3 second then start saving
      delaySave.cancel();
      await delaySave.wait(6000);
    }

    let pod = this.pod();
    // Set the new activity's owner to be the user
    pod.userID = this.user.uid;

    // If it is brand activity created locally and also make sure
    // the activity owned by the user
    if(activityID && ownerID == this.user.uid) {
      console.log('Updating activity...')
      await firebase.firestore().collection('activities').doc(activityID).set(pod).then(() => {
        console.info('Successfully updating activity')
      }).catch(error => {
        console.error('Error updating activity: ', error)
      })
    }
    else {
      console.log('Creating new activity...')
      if(creating) {
        console.info('Waiting for activity creation...')
        return;
      }

      creating = true;
      await firebase.firestore().collection('activities').add(pod).then(docRef => {
        this.setActivityID(docRef.id);
        this.setOwnerID(this.user.uid);
        creating = false;
        console.info('Sucessfully creating activity')
        window.location.href = window.location.href.split('#')[0] + '#' + docRef.id;
      }).catch(error => {
        console.error('Error creating activity: ', error)
        creating = false;
      })
    }

    // activity look up for the user
    firebase.firestore().collection('users').doc(this.user.uid).set({
      activities: {[activityID]: {
        updated: firebase.firestore.FieldValue.serverTimestamp()
      }}
    }, {merge: true})
  },

  addActor: function(entry, id) {
    id = create(entry, id)
    ACTORS.push(id);
    return id;
  },

  removeActor: function(id) {
    let index = ACTORS.indexOf(id);
    if(index != -1) ACTORS.splice(index, 1);
    delete STORE[id]
  },

  addPointer: function(entry, id) {
    id = create(entry, id)
    POINTERS.push(id);
    return id;
  },

  removePointer: function(id) {
    let index = POINTERS.indexOf(id);
    if(index != -1) POINTERS.splice(index, 1);
    delete STORE[id]
  },

  addNode: function(entry, id) {
    id = create(entry, id)
    NODES.push(id);
    return id;
  },

  removeNode: function(id) {
    let index = NODES.indexOf(id);
    if(index != -1) NODES.splice(index, 1);
    delete STORE[id]
  },

  addBrain: function(entry, id) {
    id = create(entry, id)
    BRAINS.push(id);
    return id;
  },

  removeBrain: function(id) {
    let index = BRAINS.indexOf(id);
    if(index != -1) BRAINS.splice(index, 1);
    delete STORE[id]
  },

  addVariable: function(entry, id) {
    id = create(entry, id)
    VARIABLES.push(id);
    return id;
  },

  removeVariable: function(id) {
    let index = VARIABLES.indexOf(id);
    if(index != -1) VARIABLES.splice(index, 1);
    delete STORE[id]
  },

  // Audo figure out whether target is an object or an id and return the target object
  auto: function(target) {
    return (typeof target === 'object') ? target : this.get(target);
  },

  get: function(id) {
    return STORE[id];
  },

  getNodes: function() {
    return NODES.map(id => {
      return STORE[id];
    })
  },

  getActors: function() {
    return ACTORS.map(id => {
      return STORE[id]
    })
  },

  getPointers: function() {
    return POINTERS.map(id => {
      return STORE[id]
    })
  },

  getTasks: function() {
    return this.getNodes().filter(node => {
      return node instanceof Task;
    })
  },

  pod: function(detail=false) {
    let result = {};
    result.store = {};
    for(let id in this.store) {
      result.store[id] = this.store[id].pod(detail);
    }
    result.actors = ACTORS;
    result.nodes = NODES;
    result.pointers = POINTERS;
    result.brains = BRAINS;
    result.variables = VARIABLES;
    result.stage = Editor.stage.actors.map((actorID, actor) => {
      return actorID;
    });

    return result;
  },
}