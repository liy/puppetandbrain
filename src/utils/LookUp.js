// import shortid from 'shortid';
import Stage from '../Stage';

var STORE = Object.create(null);
var ACTORS = [];
var TASKS = [];
var VALUES = [];
var POINTERS = [];
var VARIABLES = [];

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

function remove(id) {
  delete store[id];
}

window.LookUp = {
  store: STORE,

  // fill: function(pod) {
  //   this.store = pod.store;
  //   ACTORS = pod.actors;
  //   TASKS = pod.tasks;
  //   VALUES = pod.values;
  //   POINTERS = pod.pointers;
  //   VARIABLES = pod.varibles;
  // },

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

  addTask: function(entry, id) {
    id = create(entry, id)
    TASKS.push(id);
    return id;
  },

  removeTask: function(id) {
    let index = DATA.indexOf(id);
    DATA.splice(index, 1);
    delete STORE[id]
  },

  addValue: function(entry, id) {
    id = create(entry, id)
    VALUES.push(id);
    return id;
  },

  removeValue: function(id) {
    let index = VALUES.indexOf(id);
    VALUES.splice(index, 1);
    delete STORE[id]
  },

  addVariable: function(entry, id) {
    id = create(entry, id)
    VARIABLES.push(id);
    return id;
  },

  removeVariable: function(id) {
    let index = VARIABLES.indexOf(id);
    VARIABLES.splice(index, 1);
    delete STORE[id]
  },

  get: function(id) {
    return STORE[id];
  },

  getTasks: function() {
    return TASKS.map(id => {
      return STORE[id];
    })
  },

  getActors: function() {
    return ACTORS.map(id => {
      return STORE[id]
    })
  },

  getValues: function() {
    return VALUES.map(id => {
      return STORE[id];
    })
  },

  getPointers: function() {
    return POINTERS.map(id => {
      return STORE[id]
    })
  },

  getVariables: function() {
    return VARIABLES.map(id => {
      return STORE[id]
    })
  },

  pod: function() {
    let result = Object.create(null);
    result.store = Object.create(null);
    for(let id in this.store) {
      result.store[id] = this.store[id].pod();
    }
    result.actors = ACTORS.concat()
    result.tasks = TASKS.concat()
    result.values = VALUES.concat();
    result.pointers = POINTERS.concat();
    result.varibles = VARIABLES.concat();
    result.stage = Stage.actors.concat();

    return result;
  },
}