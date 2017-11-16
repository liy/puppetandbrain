import JSONLoader from './JSONLoader';
import Stage from './Stage';

import * as tasks from './tasks'
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';

import * as arithmetic from './value/Arithmetic';
import Property from './value/Property';

const scope = {
  ...tasks,
  SpineActor,
  SpriteActor,
  ...arithmetic,
  Property
}


export default class ActivityLoader
{
  constructor() {

  }

  load(url) {
    return JSONLoader.load(url).then(pod => {
      // TESTING
      // console.log('JSON: ',pod)

      // TODO: object seconds
      this.createActors(pod)

      // TODO: tasks last
      this.createTasks(pod)

      // TODO: create other nodes, eg., value nodes
      this.createValueNodes(pod)

      // TODO: link input and outputs!!
      this.connectInputOuput(pod)
    })
  }

  createActors(pod) {
    var add = function(container, data) {
      let actor = new scope[data.class](data.url, data.id);
      actor.fill(data);
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
      let task = new scope[data.class]()
      task.fill(data)
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

  createValueNodes(pod) {
    for(let id of pod.values) {
      let data = pod.store[id];
      let valueNode = new scope[data.class](id)
      valueNode.fill(data)
    }
  }

  connectInputOuput(pod) {
    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerData = pod.store[id];
      let inputNode = LookUp.get(pointerData.inputNode);
      let outputNode = LookUp.get(pointerData.outputNode);

      // console.log(pointerData, inputNode, outputNode)

      inputNode.inputs.connect(pointerData.inputName, outputNode, pointerData.outputName)
    }
  }
}