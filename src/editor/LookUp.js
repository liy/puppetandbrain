export default class 
{
  constructor(activity) {
    this.activity = activity;

    this.store = {};
    this.actors = [];
    this.nodes = [];
    this.pointers = [];
    this.brains = [];
    this.variables = [];
  }

  // private, may be turn it into a static function?
  create(entry, id) {
    // if no id, or id exist, create a new id for the item
    if(!id || id in this.store) {
      // naive way, better to use hash(random + timestamp + machine name + etc).
      while(true) {
        id = Math.floor(Math.random() * 999)+1;
        if(!this.store[id]) break;
      }

      // id = shortid.generate();
    }
    this.store[id] = entry;
    return id;
  }

  addActor(entry, id) {
    id = this.create(entry, id)
    this.actors.push(id);
    return id;
  }

  removeActor(id) {
    let index = this.actors.indexOf(id);
    if(index != -1) this.actors.splice(index, 1);
    delete this.store[id]
  }

  addPointer(entry, id) {
    id = this.create(entry, id)
    this.pointers.push(id);
    return id;
  }

  removePointer(id) {
    let index = this.pointers.indexOf(id);
    if(index != -1) this.pointers.splice(index, 1);
    delete this.store[id]
  }

  addNode(entry, id) {
    id = this.create(entry, id)
    this.nodes.push(id);
    return id;
  }

  removeNode(id) {
    let index = this.nodes.indexOf(id);
    if(index != -1) this.nodes.splice(index, 1);
    delete this.store[id]
  }

  addBrain(entry, id) {
    id = this.create(entry, id)
    this.brains.push(id);
    return id;
  }

  removeBrain(id) {
    let index = this.brains.indexOf(id);
    if(index != -1) this.brains.splice(index, 1);
    delete this.store[id]
  }

  addVariable(entry, id) {
    id = this.create(entry, id)
    this.variables.push(id);
    return id;
  }

  removeVariable(id) {
    let index = this.variables.indexOf(id);
    if(index != -1) this.variables.splice(index, 1);
    delete this.store[id]
  }

  // Audo figure out whether target is an object or an id and return the target object
  auto(target) {
    return (typeof target === 'object') ? target : this.get(target);
  }

  get(id) {
    return this.store[id];
  }

  getNodes() {
    return this.nodes.map(id => {
      return this.store[id];
    })
  }

  getActors() {
    return this.actors.map(id => {
      return this.store[id]
    })
  }

  getDataLinks() {
    return this.pointers.map(id => {
      return this.store[id]
    })
  }

  getTasks() {
    return this.getNodes().filter(node => {
      return node.execution != null;
    })
  }

  hasID(id) {
    return id in this.store;
  }

  clear() {
    this.store = {};
    this.actors = [];
    this.nodes = [];
    this.pointers = [];
    this.brains = [];
    this.variables = [];
  }

  pod(detail=false) {
    let result = {};
    result.store = {};
    for(let id in this.store) {
      result.store[id] = this.store[id].pod(detail);
    }
    result.actors = this.actors.concat();
    result.nodes = this.nodes.concat();
    result.pointers = this.pointers.concat();
    result.brains = this.brains.concat();
    result.variables = this.variables.concat();
    result.stage = Hub.stage.actors.map((actorID, actor) => {
      return actorID;
    });

    return result;
  }
}
