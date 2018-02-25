import LoaderBucket from './resources/LoaderBucket';
import ActorFactory from './objects/ActorFactory';

export default class ActivityLoader
{
  constructor(activity) {
    this.activity = activity;
    this.resources = activity.resources;
    this.lookUp = activity.lookUp;
  }

  async parse(pod) {
    console.log('Loading', pod)
    await this.preload(pod);

    this.createActors(pod);
    // create nodes; link execution, input and outputs
    this.fillBrains(pod);
  }

  async preload(pod) {
    let loader = new LoaderBucket(this.resources);
    
    let urlPromises = [];
    for(let id of pod.actors) {
      let actorPod = pod.store[id];
      for(let entry of actorPod.libFiles) {
        let path = `${actorPod.libDir}/${actorPod.puppetID}/${entry.fileName}`;
        urlPromises.push(API.getUrl(path).then(url => {
          loader.add(path, url, entry.contentType)
        }))
      }
      // user files
      for(let fileData of actorPod.userFiles) {
        urlPromises.push(API.getUrl(fileData.path).then(url => {
          loader.add(fileData.path, url, fileData.contentType)
        }))
      }
    }
    await Promise.all(urlPromises);
    await loader.start();
  }

  createActors(pod) {
    let promises = [];

    for(let id of pod.stage) {
      let actorPod = pod.store[id];

      let actor = ActorFactory.create(actorPod.className, actorPod.id, this.activity);
      actor.init(actorPod);
      Editor.stage.addActor(actor);
      promises.push(actor.loaded);
    }

    return Promise.all(promises);
  }

  fillBrains(pod) {
    // create all the variables first
    for(let id of pod.variables) {
      let variablePod = pod.store[id];
      // put the variable into its brain
      let brain = this.lookUp.get(variablePod.brainID);
      brain.variables.create(variablePod);
    }

    let performs = [];
    for(let id of pod.nodes) {
      let data = pod.store[id];
      let node = NodeFactory.create(data.className, id, this.activity)
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
      let node = this.lookUp.get(data.id);
      node.init(data);
    }

    // connect the tasks
    for(let id of pod.nodes) {
      let node = this.lookUp.get(id);
      // does not have execution, a data node
      if (!node.execution) continue;
      let data = pod.store[id];
      for(let execPod of data.execution) {
        if(execPod.nodeID) node.connectNext(this.lookUp.get(execPod.nodeID), execPod.name)
      }
    }

    // connect the inputs with outputs
    for(let id of pod.pointers) {
      let pointerPod = pod.store[id];
      let node = this.lookUp.get(pointerPod.nodeID);

      let pointer = node.inputs.get(pointerPod.name);
      pointer.set(pointerPod)
    }
  }
}