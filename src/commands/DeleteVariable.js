import Command from './Command';
import Variable from '../data/Variable';
import ActorVariable from '../data/ActorVariable';
import DataType from '../data/DataType';
import PropertyController from '../graph/elements/PropertyController';

export default class DeleteVariable extends Command
{
  constructor(variableID, brainID) {
    super();
    this.variableID = variableID;
    this.brainID = brainID;
    this.variablePod = this.variable.pod();
    this.variableIndex = 0;
  }

  get variable() {
    return LookUp.get(this.variableID);
  }
  
  process() {
    this.getterPods = [];
    this.setterPods = [];


    // remove the variable
    let brain = LookUp.get(this.brainID);
    let {variable, index} = brain.variables.remove(this.variablePod.id);
    this.variableIndex = index;

    // Get all and delete the getters and setters related to this variable
    // Note that I put the actual deletion in separate loop.
    // Just because I need the actual original pod of the nodes. Delete block
    // would have changed the data(e.g., execution input output link )
    for(let getter of this.variable.getters) {
      this.getterPods.push(getter.pod(true));
    }
    for(let setter of this.variable.setters) {
      this.setterPods.push(setter.pod(true));
    }
    for(let getter of this.variable.getters) {
      BrainGraph.deleteBlock(BrainGraph.getBlock(getter.id))
    }
    for(let setter of this.variable.setters) {
      BrainGraph.deleteBlock(BrainGraph.getBlock(setter.id))
    }

    // destroy the variable, remove it from the look up
    variable.destroy();

    return this;
  }

  undo() {
    // put back the variable first
    let variable = (this.variablePod.type == DataType.ACTOR) ? new ActorVariable(this.variablePod.id) : new Variable(this.variablePod.id);
    variable.init(this.variablePod);
    LookUp.get(this.brainID).variables.insert(variable, this.variableIndex);

    // re-create the nodes and blocks first. Getting ready for execution 
    // and variable linking!
    for(let pod of this.getterPods) {
      let node = NodeFactory.create(pod.className, pod.id);
      node.init(pod);
    }
    for(let pod of this.setterPods) {
      let node = NodeFactory.create(pod.className, pod.id);
      node.init(pod);
    }

    // Check DeleteBlock command for a simpler version of recovering 
    // execution connection and output input link...
    // Here is basically multiple undo of the DeleteBlock

    // connect setter's execution
    for(let pod of this.setterPods) {
      let node = LookUp.get(pod.id);
      for(let exec of pod.execution) {
        if(exec.id) node.connectNext(LookUp.get(exec.id), exec.name)
      }
      // setter always has enter field
      for(let callerPod of pod.enter.callers) {
        if(callerPod.nodeID) node.connectParent(LookUp.get(callerPod.nodeID), callerPod.executionName);
      }
    }
    
    // connect setter inputs directly using pointer
    for(let pod of this.setterPods) {
      for(let pointerPod of pod.inputs) {
        let inputNode = LookUp.get(pointerPod.inputNode);
        let pointer = inputNode.inputs.get(pointerPod.name);
        pointer.set(pointerPod)
      }
    }
    // connect setter outputs
    for(let pod of this.setterPods) {
      let node = LookUp.get(pod.id);
      for(let outputPod of pod.outputs) {
        let output = node.outputs.get(outputPod.name);
        // note connection not a qulified pointer pod. Resursive issue...
        // Just loop through all the inputs connected to current output, and connect them!
        for(let connection of outputPod.connections) {
          let pointer = LookUp.get(connection.inputNode).inputs.get(connection.inputName);
          pointer.connect(output, connection.id)
        }
      }
    }

    // connect getter outputs
    for(let pod of this.getterPods) {
      let node = LookUp.get(pod.id);
      for(let outputPod of pod.outputs) {
        let output = node.outputs.get(outputPod.name);
        // note connection not a qulified pointer pod. Resursive issue...
        // Just loop through all the inputs connected to current output, and connect them!
        for(let connection of outputPod.connections) {
          let pointer = LookUp.get(connection.inputNode).inputs.get(connection.inputName);
          pointer.connect(output, connection.id)
        }
      }
    }
    
    // create block
    for(let pod of this.getterPods) {
      // make sure the node related block needs belong the variable owner brain
      // this is for future proof, if we allow variable access across different brains.
      if(pod.targetBrain == this.brainID) {
        BlockFactory.create(LookUp.get(pod.id));
      }
    }
    for(let pod of this.setterPods) {
      if(pod.targetBrain == this.brainID) {
        BlockFactory.create(LookUp.get(pod.id));
      }
    }
    
    BrainGraph.refresh();

    // as variable list has order, easiest way is refresh the whole panel.
    PropertyController.refresh();
  }

  redo() {
    this.process();
    BrainGraph.refresh();
  }
}