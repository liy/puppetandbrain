// import shortid from 'shortid';
import Task from './nodes/Task';
import Delay from './access/Delay';

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
  // if no id, or id exist, create a new id for the item
  if(!id || id in STORE) {
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
  // for debugging...
  get store() {
    return STORE;
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

  getDataLinks: function() {
    return POINTERS.map(id => {
      return STORE[id]
    })
  },

  getTasks: function() {
    return this.getNodes().filter(node => {
      return node instanceof Task;
    })
  },

  hasID: function(id) {
    return id in STORE;
  },

  clear: function() {
    STORE = {};
    ACTORS = [];
    NODES = [];
    POINTERS = [];
    BRAINS = [];
    VARIABLES = [];
  },

  pod: function(detail=false) {
    let result = {};
    result.activityID = activityID
    result.store = {};
    for(let id in STORE) {
      result.store[id] = STORE[id].pod(detail);
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