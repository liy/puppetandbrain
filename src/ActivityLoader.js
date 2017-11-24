import JsonPromise from './utils/JsonPromise';
import Stage from './objects/Stage';
import * as nodes from './nodes'
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';
import DataNode from './nodes/DataNode';

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
      this.createBrains(pod)
    })
  }

  createActors(pod) {
    var add = function(container, data) {
      let actor = new scope[data.className](data.id);
      actor.init(data);
      container.addActor(actor);

      for(let i=0; i<data.childActors.length; ++i) {
        let childID = data.childActors[i];
        let childData = data.store[childID];
        add(actor, childData)
      }
    }

    for(let id of pod.stage) {
      let data = pod.store[id];
      add(Stage, data)
    }
  }

  createBrains(pod) {
    for(let id of pod.nodes) {
      let data = pod.store[id];
      let node = NodeFactory.create(data.className, id)
      node.init(data)
    }

    // chain the tasks
    for(let id of pod.nodes) {
      let node = LookUp.get(id);
      if (node instanceof DataNode) continue;
      let data = pod.store[id];
      for(let execData of data.execution) {
        if(execData.id) node.connectNext(LookUp.get(execData.id), execData.executionName)
      }
    }

    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerPod = pod.store[id];
      let inputNode = LookUp.get(pointerPod.inputNode);

      let pointer = inputNode.inputs.get(pointerPod.inputName);
      pointer.init(pointerPod)
    }
  }
}