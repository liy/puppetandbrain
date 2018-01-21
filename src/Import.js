import * as ObjecClasses from './objects';

export default class Import
{
  constructor() {
    this.ids = {};
  }

  mapID(id) {
    // generate new ids
    while(true) {
      let newID = Math.floor(Math.random() * 999)+1;
      if(!this.ids[newID] && LookUp.hasID(newID)) break;
    }
    this.ids[id] = newID;
    return newID;
  }

  start(pod) {
    // map all ids
    let ids = [
      ...pod.actors=[],
      ...pod.brains=[],
      ...pod.nodes=[],
      ...pod.inputs=[],
      ...pod.variables=[],
    ]
    ids.forEach(this.mapID);

    switch(pod.type) {
      case 'actor':
        this.importActor(pod);
        break;
      case 'brain':
        this.importBrain(pod);
        break;
      case 'node':
        this.importNode(pod);
        break;
      case 'variable':
        this.importVariable(pod);
        break;
    }
  }

  importActor() {
    
  }

  importBrain() {

  }

  importNode() {

  }

  importVariable() {

  }

  createActors() {
    for(let id of pod.actors) {
      let actorPod = pod.store[id];
      let actor = new ObjecClasses[actorPod.className](this.ids(actorPod.id));
      actor.init(actorPod);
      Editor.stage.addActor(actor);
    }
  }

  fillBrains(pod) {
    // create all the variables first
    for(let id of pod.variables) {
      let variablePod = pod.store[id];
      let variable = new Variable(this.ids[id]);
      variable.init(variablePod);
      // put the variable into its brain
      let brain = LookUp.get(variablePod.brainID);
      brain.variables.add(variable);
    }

    let performs = [];
    for(let id of pod.nodes) {
      let data = pod.store[id];
      let node = NodeFactory.create(data.className, this.ids[id])
      // delay perform node initialization,
      // since they depend on Action nodes to be initialized first
      if(data.className ==  'Perform') {
        performs.push(data);
        continue;
      }
      node.init(data)
    }

    // initilaize perform node
    for(let data of performs) {
      let node = LookUp.get(this.ids[data.id]);
      node.init(data);
    }

    // connect the tasks
    for(let id of pod.nodes) {
      let node = LookUp.get(id);
      // does not have execution, a data node
      if (!node.execution) continue;
      let data = pod.store[id];
      for(let execPod of data.execution) {
        if(execPod.nodeID) node.connectNext(LookUp.get(execPod.nodeID), execPod.name)
      }
    }

    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerPod = pod.store[id];
      let inputNode = LookUp.get(pointerPod.nodeID);

      let pointer = inputNode.inputs.get(pointerPod.name);
      pointer.set(pointerPod)
    }
  }
}