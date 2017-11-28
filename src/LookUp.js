// import shortid from 'shortid';
import Task from './nodes/Task';

// var STORE = Object.create(null);
var STORE = {};
var ACTORS = [];
var NODES = [];
var POINTERS = [];
var BRAINS = [];

var running = false;
var activityID = null;
var creating = false;

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

    LookUp.save();
  }
})

window.LookUp = {
  store: STORE,
  user: null,

  setActivityID: function(id) {
    activityID = id;
    document.getElementById('activity-id').textContent = activityID;
  },

  save: function() {
    if(!this.user.uid) {
      console.error('User id cannot be null', this.user.uid); 
      return;
    }

    let pod = this.pod();
    pod.userID = this.user.uid;

    if(activityID) {
      console.log('saving existing activity!')
      firebase.firestore().collection('activities').doc(activityID).set(pod).then(result => {
        console.info('Done update activity: ', result)
      }).catch(error => {
        console.error('Error update activity: ', error)
      })
    }
    else {
      console.log('creating new activity!')
      if(creating) {
        console.info('Waiting for creating activity...')
        return;
      } 

      creating = true;
      console.log(pod)
      // let test = {
      //   nested: {
      //     names: ['testing', 'what']
      //   }
      // }
      firebase.firestore().collection('activities').add(pod).then(docRef => {
        this.setActivityID(docRef.id)
        creating = false;
        console.info('Done create activity: ', docRef)
        window.location.href += '#' + docRef.id;
      }).catch(error => {
        console.error('Error create activity: ', error)
        creating = false;
      })
    }
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

  pod: function() {
    let result = {};
    result.store = {};
    for(let id in this.store) {
      result.store[id] = this.store[id].pod(false);
    }
    result.actors = ACTORS;
    result.nodes = NODES;
    result.pointers = POINTERS;
    result.brains = BRAINS;
    result.stage = Stage.actors;

    return result;
  },
}