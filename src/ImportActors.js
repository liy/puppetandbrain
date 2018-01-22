import * as ObjecClasses from './objects';
import Variable from './data/Variable';

export default class ImportActors
{
  constructor() {
    this.mapping = {};
  }

  start(pod) {
    this.createActors(pod);
    this.createNodes(pod)
  }

  createActors(pod) {
    console.log(pod);
    for(let id of pod.actors) {
      // note that I do not need to remove brainID from actorPod.
      // Because LookUp will generate a new ID if brainID exist.
      let actorPod = pod.store[id];
      // TODO: do edge checking?
      actorPod.position.x += 10;
      actorPod.position.y += 10;
      let actor = new ObjecClasses[actorPod.className]();
      actor.init(actorPod);
      Editor.stage.addActor(actor);

      // map new item with old id
      this.mapping[id] = actor;
      this.mapping[actorPod.brainID] = actor.brain;

      // create variable for the actor brain
      let brainPod = pod.store[actorPod.brainID];
      for(let variableID of brainPod.variables) {
        let variable = actor.brain.variables.create(pod.store[variableID])
        this.mapping[variableID] = variable;
      }
    }
  }

  createNodes(pod) {

  }
}