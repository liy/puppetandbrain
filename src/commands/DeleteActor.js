import Command from './Command';
import SpineActor from '../objects/SpineActor';
import Action from '../nodes/Action';
import DataNode from '../nodes/DataNode';

export default class DeleteActor extends Command
{
  constructor(actorID) {
    super();
    this.actorID = actorID;
  }

  process() {
    let actor = LookUp.get(this.actorID);
    this.pod = actor.pod(true);

    console.log(this.pod)

    actor.destroy();
    Stage.removeActor(actor);

    return this;
  }

  undo() {
    let actor = new SpineActor(this.pod.id);
    actor.init(this.pod);
    Stage.addActor(actor)

    // create and init nodes
    for(let nodePod of this.pod.brain.nodes) {
      let node = new NodeFactory.create(nodePod.className, nodePod.id)
      node.init(nodePod);
    }

    // connect the tasks
    for(let nodePod of this.pod.brain.nodes) {
      // data node, has no exectuion
      if (!nodePod.execution) continue;
      let node = LookUp.get(nodePod.id);
      for(let execData of nodePod.execution) {
        if(execData.id) node.connectNext(LookUp.get(execData.id), execData.executionName)
      }
    }

    // connect the inputs with outputs
    for(let pointerPod of this.pod.brain.pointers) {
      let inputNode = LookUp.get(pointerPod.inputNode);
      let pointer = inputNode.inputs.get(pointerPod.inputName);
      pointer.set(pointerPod)
    }
  }

  redo() {
    this.processAndSave();
  }
}