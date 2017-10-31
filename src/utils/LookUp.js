var STORE = Object.create(null);
var ACTORS = [];
var DATA = [];
var TASKS = [];

function create(entry, id) {
  if(!id) {
    while(true) {
      id = Math.floor(Math.random() * 9999999);
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
  },
  
  addData: function(entry, id) {
    id = create(entry, id)
    DATA.push(id);
    return id;
  },

  removeData: function(id) {
    let index = DATA.indexOf(id);
    DATA.splice(index, 1);
  },
  
  addTask: function(entry, id) {
    id = create(entry, id)
    TASKS.push(id);
    return id;
  },

  removeTask: function(id) {
    let index = DATA.indexOf(id);
    DATA.splice(index, 1);
  },

  get: function(id) {
    return STORE[id];
  },

  pod: function() {
    let result = Object.create(null);
    result.store = Object.create(null);
    for(let id in this.store) {
      result.store[id] = this.store[id].pod();
    }
    result.actors = ACTORS.concat()
    result.tasks = TASKS.concat()
    result.data = DATA.concat()
    
    return result;
  },
}