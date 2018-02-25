import Command from './Command';
import * as ObjecClasses from '../objects';
import Action from '../nodes/Action';
import Variable from '../data/Variable';

export default class DeleteActor extends Command
{
  constructor(actorID) {
    super();
    this.actorID = actorID;
  }

  process() {
    let actor = this.lookUp.get(this.actorID);
    this.pod = actor.pod(true);

    actor.deselect()

    Editor.stage.removeActor(actor);
    actor.destroy();

    return this;
  }

  undo() {
    // let actor = new SpineActor(this.pod.id);
    let actor = new ObjecClasses[this.pod.className](this.pod.id);
    actor.init(this.pod);
    Editor.stage.addActor(actor)

    // create variables
    for(let variablePod of this.pod.brain.variables) {
      let variable = new Variable(variablePod.id, this.lookUp);
      variable.init(variablePod);
      // put the variable into its brain
      let brain = this.lookUp.get(variablePod.brainID);
      brain.variables.add(variable);
    }

    // create and init nodes
    for(let nodePod of this.pod.brain.nodes) {
      let node = new NodeFactory.create(nodePod.className, nodePod.id, this.lookUp)
      node.init(nodePod);
    }

    // connect the tasks
    for(let nodePod of this.pod.brain.nodes) {
      // data node, has no exectuion
      if (!nodePod.execution) continue;
      let node = this.lookUp.get(nodePod.id);
      for(let execData of nodePod.execution) {
        if(execData.nodeID) node.connectNext(this.lookUp.get(execData.nodeID), execData.name)
      }
    }

    // connect the inputs with outputs
    for(let pointerPod of this.pod.brain.pointers) {
      let inputNode = this.lookUp.get(pointerPod.nodeID);
      let pointer = inputNode.inputs.get(pointerPod.name);
      pointer.set(pointerPod)
    }
  }

  redo() {
    this.process();
  }
}