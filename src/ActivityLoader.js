import JsonPromise from './utils/JsonPromise';
import * as nodes from './nodes'
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';
import Variable from './data/Variable';
import ActorVariable from './data/ActorVariable';
import DataType from './data/DataType';

const scope = {
  ...nodes,
  SpineActor,
  SpriteActor,
}

export default class ActivityLoader
{
  constructor() {

  }

  load(url) {
    return JsonPromise.load(url).then(pod => {
      this.createActors(pod)
      // create nodes; link execution, input and outputs
      this.fillBrains(pod)
    })
  }

  async parse(pod) {
    await this.createActors(pod);
    // create nodes; link execution, input and outputs
    this.fillBrains(pod);
  }

  createActors(pod) {
    let promises = [];
    // Handles nested actors.
    var add = function(container, actorPod) {
      let actor = new scope[actorPod.className](actorPod.id);
      actor.init(actorPod);
      container.addActor(actor);
      promises.push(actor.loaded);

      for(let i=0; i<actorPod.childActors.length; ++i) {
        let childID = actorPod.childActors[i];
        let childData = actorPod.store[childID];
        add(actor, childData)
      }
    }

    for(let id of pod.stage) {
      let actorPod = pod.store[id];
      add(Editor.stage, actorPod)
    }

    return Promise.all(promises);
  }

  fillBrains(pod) {
    // create all the variables first
    for(let id of pod.variables) {
      let variablePod = pod.store[id];
      let variable = (variablePod.type == DataType.ACTOR) ? new ActorVariable(id) : new Variable(id);
      variable.init(variablePod);
      // put the variable into its brain
      let brain = LookUp.get(variablePod.brain);
      brain.variables.add(variable);
    }

    let performs = [];
    for(let id of pod.nodes) {
      let data = pod.store[id];
      let node = NodeFactory.create(data.className, id)
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
      let node = LookUp.get(data.id);
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
      let inputNode = LookUp.get(pointerPod.inputNode);

      let pointer = inputNode.inputs.get(pointerPod.name);
      pointer.set(pointerPod)
    }
  }
}