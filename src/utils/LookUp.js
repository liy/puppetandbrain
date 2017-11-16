var STORE = Object.create(null);
var ACTORS = [];
var TASKS = [];
var ARITHMETICS = [];
var PROPERTIES = [];
var GETTERS = []

function create(entry, id) {
  if(!id) {
    while(true) {
      id = Math.floor(Math.random() * 999)+1;
      if(!STORE[id]) break;
    }
  }
  STORE[id] = entry;
  return id;
}

function remove(id) {
  delete store[id];
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

  addGetter: function(entry, id) {
    id = create(entry, id)
    GETTERS.push(id);
    return id;
  },
  
  removeGetter: function(id) {
    let index = GETTERS.indexOf(id);
    GETTERS.splice(index, 1);
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

  addArithmetic: function(entry, id) {
    id = create(entry, id)
    ARITHMETICS.push(id);
    return id;
  },

  removeArithmetic: function(id) {
    let index = ARITHMETICS.indexOf(id);
    ARITHMETICS.splice(index, 1);
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

  getArithmetics: function() {
    return ARITHMETICS.map(id => {
      return STORE[id];
    })
  },

  getGetters: function() {
    return GETTERS.map(id => {
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
    result.arithmetics = ARITHMETICS.concat();
    result.getters = GETTERS.concat();
    
    return result;
  },
}