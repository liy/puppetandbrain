import SpineActor from '../objects/SpineActor';
import SpriteActor from '../objects/SpriteActor';

const scope = {
  SpineActor,
  SpriteActor,
}

window.ActorLookUp = {
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

  remove: function(target) {
    delete this.data[target.id];
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
    // pod is an array
    for(let key of pod) {
      // console.log(scope[entityData.class], entityData)
      // scope[data.class].deserialize(entityData);
    }
  }
}