window.DataLookUp = {
  data: Object.create(null),

  create: function(target, id) {
    if(!id) {
      while(true) {
        id = Math.floor(Math.random() * 10000);
        if(!this.data[id]) break;
      }
    }
  
    this.data[id] = target;
  
    return id;
  },

  remove: function(id) {
    delete this.data[id];
  },

  get: function(id) {
    return this.data[id];
  },

  pod: function() {
    let result = Object.create(null);
    for(let id in this.data) {
      result[id] = this.data[id].pod();
    }
    return result;
  },
  
  load: function(pod) {

  }
}