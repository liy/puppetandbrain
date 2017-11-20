// import shortid from 'shortid';
import Stage from './objects/Stage';
import Task from './nodes/Task';

var STORE = Object.create(null);
var ACTORS = [];
var NODES = [];
var POINTERS = [];
var BRAINS = [];

var running = false;

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

window.LookUp = {
  store: STORE,

  addActor: function(entry, id) {
    id = create(entry, id)
    ACTORS.push(id);
    return id;
  },

  removeActor: function(id) {
    let index = ACTORS.indexOf(id);
    ACTORS.splice(index, 1);
    delete STORE[id]
  },

  addPointer: function(entry, id) {
    id = create(entry, id)
    POINTERS.push(id);
    return id;
  },

  removePointer: function(id) {
    let index = POINTERS.indexOf(id);
    POINTERS.splice(index, 1);
    delete STORE[id]
  },

  addNode: function(entry, id) {
    id = create(entry, id)
    NODES.push(id);
    return id;
  },

  removeNode: function(id) {
    let index = NODES.indexOf(id);
    NODES.splice(index, 1);
    delete STORE[id]
  },

  addBrain: function(entry, id) {
    id = create(entry, id)
    BRAINS.push(id);
    return id;
  },

  removeBrain: function(id) {
    let index = BRAINS.indexOf(id);
    BRAINS.splice(index, 1);
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

  toggle() {
    if(running) {
      this.reset();
    }
    else {
      this.start();
    }
    running = !running;
  },

  start: function() {
    for(let id of NODES) {
      let node = this.store[id];
      if(node instanceof Task) node.setInitialState();
    }

    for(let id of ACTORS) {
      let actor = this.store[id];
      actor.setInitialState();
      actor.start();
    }
  },

  reset: function() {
    for(let id of NODES) {
      let node = this.store[id];
      if(node instanceof Task) node.reset();
    }

    for(let id of ACTORS) {
      let actor = this.store[id];
      actor.reset();
    }

    // TODO: re-initialize the destroyed actor
  },

  pod: function() {
    let result = Object.create(null);
    result.store = Object.create(null);
    for(let id in this.store) {
      result.store[id] = this.store[id].pod();
    }
    result.actors = ACTORS.concat()
    result.nodes = NODES.concat()
    result.pointers = POINTERS.concat();
    result.stage = Stage.actors.concat();

    return result;
  },
}