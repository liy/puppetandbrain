import JsonPromise from './utils/JsonPromise';
import Stage from './objects/Stage';
import * as nodes from './nodes'
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';

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

      this.createTasks(pod)

      // create other nodes, eg., value nodes
      this.createDataNodes(pod)

      // link input and outputs!!
      this.connectInputOutput(pod)
    })
  }

  createActors(pod) {
    var add = function(container, data) {
      let actor = new scope[data.class](data.id);
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

  createTasks(pod) {
    for(let id of pod.tasks) {
      let data = pod.store[id];
      let task = new scope[data.class](id)
      task.init(data)
    }

    // chain the tasks
    for(let id of pod.tasks) {
      let data = pod.store[id];
      let task = LookUp.get(id);
      for(let execData of data.execution) {
        task.chain({
          name: execData.name,
          task: LookUp.get(execData.id)
        })
      }
    }
  }

  createDataNodes(pod) {
    for(let id of pod.values) {
      let data = pod.store[id];
      let valueNode = new scope[data.class](id)
      valueNode.init(data)
    }
  }

  connectInputOutput(pod) {
    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerData = pod.store[id];
      let inputNode = LookUp.get(pointerData.inputNode);
      let outputNode = LookUp.get(pointerData.outputNode);

      inputNode.inputs.connect(pointerData.inputName, outputNode, pointerData.outputName)
    }
  }
}