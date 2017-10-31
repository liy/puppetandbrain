import JSONLoader from './JSONLoader';
import Stage from './Stage';
import {Data} from './Data';

import * as tasks from './tasks'
import SpineActor from './objects/SpineActor';
import SpriteActor from './objects/SpriteActor';

const scope = {
  ...tasks,
  SpineActor,
  SpriteActor,
}


export default class ActivityLoader
{
  constructor() {

  }

  load(url) {
    return JSONLoader.load(url).then(pod => {
      // TODO: data first
      this.createData(pod);

      // TODO: object seconds
      this.createActors(pod)

      // TODO: tasks last
      this.createTasks(pod)
    })
  }

  createData(pod) {
    for(let id of pod.data) {
      new Data(pod.store[id].value, id)
    }
  }

  createActors(pod) {
    var add = function(container, actorData) {
      let actor = new scope[actorData.class](actorData.url, actorData.id);
      container.addActor(actor);

      for(let i=0; i<actorData.childActors.length; ++i) {
        let childID = actorData.childActors[i];
        let childData = actorData.store[childID];
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
      // functions will be auto linked with its related actor 
      task.fill(data)
    }

    let tasks = LookUp.getTasks();
    for(let task of tasks) {
      for(let exec of pod.store[task.id].execution) {
        if(exec.name == 'default') {
          task.chain(LookUp.get(exec.id)) 
        }
      }
    }
  }
}