import JSONLoader from './JSONLoader';
import Stage from './Stage';

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
      // TODO: object seconds
      this.createActors(pod)

      // TODO: tasks last
      this.createTasks(pod)
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
      console.log(task)
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