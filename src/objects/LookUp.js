const LookUp = Object.create(null);

export default {
  create: function(target, id) {
    if(!id) {
      while(true) {
        id = Math.floor(Math.random() * 10000);
        if(!LookUp[id]) break;
      }
    }
  
    LookUp[id] = target;
  
    return id;
  },

  remove: function(target) {
    delete LookUp[target.id];
  },

  get: function(id) {
    return LookUp[id];
  }
}