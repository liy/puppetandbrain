// import shortid from 'shortid';
import Stage from './objects/Stage';

var STORE = Object.create(null);
var ACTORS = [];
var TASKS = [];
var VALUES = [];
var POINTERS = [];
var VARIABLES = [];

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

  addTask: function(entry, id) {
    id = create(entry, id)
    TASKS.push(id);
    return id;
  },

  removeTask: function(id) {
    let index = TASKS.indexOf(id);
    TASKS.splice(index, 1);
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

  // Audo figure out whether target is an object or an id and return the target object
  auto: function(target) {
    return (typeof target === 'object') ? target : this.get(target);
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
    for(let id of TASKS) {
      let task = this.store[id];
      task.setInitialState();
    }

    for(let id of ACTORS) {
      let actor = this.store[id];
      actor.setInitialState();
      actor.start();
    }
  },

  reset: function() {
    for(let id of TASKS) {
      let task = this.store[id];
      task.reset();
    }

    for(let id of ACTORS) {
      let actor = this.store[id];
      actor.reset();
    }
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
    result.stage = Stage.actors.concat();
    // FIXME: in production this should not be serialzied
    // local variable access is auto linked once the node's variable 
    // is populated and corresponding input name is added
    result.variables = VARIABLES.concat();

    return result;
  },
}