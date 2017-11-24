import Command from './Command';
import SpineActor from '../objects/SpineActor';
import Stage from '../objects/Stage'
import Action from '../nodes/Action';
import ActionName from '../nodes/ActionName';
import DataNode from '../nodes/DataNode';

export default class DeleteActor extends Command
{
  constructor(actorID) {
    super();
    this.actorID = actorID;
  }

  process() {
    console.log(this.actorID)
    let actor = LookUp.get(this.actorID);
    this.actorPod = actor.pod();

    let nodes = actor.brain.getNodes();
    this.nodePods = nodes.map(node => {
      return node.pod();
    })

    let pointers = actor.brain.getPointers();
    this.pointerPods = pointers.map(pointer => {
      return pointer.pod();
    })

    actor.destroy();
    Stage.removeActor(actor);

    return this;
  }

  undo() {
    // FIXIME: Better way to handle this
    let actor = new SpineActor(this.actorPod.id);
    actor.init(this.actorPod);
    Stage.addActor(actor)

    // create and init nodes
    for(let nodePod of this.nodePods) {
      console.log(nodePod)
      let node = new NodeFactory.create(nodePod.className, nodePod.id)
      node.init(nodePod);
    }

    // chain the tasks
    for(let nodePod of this.nodePods) {
      let node = LookUp.get(nodePod.id);
      if (node instanceof DataNode) continue;
      for(let execData of nodePod.execution) {
        if(execData.id) node.connectNext(LookUp.get(execData.id), execData.executionName)
      }
    }

    // connect the inputs with outputs
    for(let pointerPod of this.pointerPods) {
      let inputNode = LookUp.get(pointerPod.inputNode);
      let pointer = inputNode.inputs.get(pointerPod.inputName);
      pointer.init(pointerPod)
    }
  }

  redo() {
    this.process();
  }
}