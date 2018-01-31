import Command from './Command';
import Variable from '../data/Variable';
import DataType from '../data/DataType';
import ElementController from '../graph/elements/ElementController';
import GraphSelection from '../graph/GraphSelection';

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
    if(this.variable.inUse) {
      let confirm = window.confirm('Variable is in use, do you really want to delete the varaible and its getters and setters?');
      if(!confirm) return false;
    }

    this.delete();

    return this;
  }

  delete() {
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

    GraphSelection.deselect();
  }

  undo() {
    // put back the variable first
    let variable = new Variable(this.variablePod.id);
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
    // execution link and output input link...
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
    
    // connect setter inputs directly using input
    for(let pod of this.setterPods) {
      for(let pointerPod of pod.inputs) {
        let inputNode = LookUp.get(pointerPod.nodeID);
        let pointer = inputNode.inputs.get(pointerPod.name);
        pointer.set(pointerPod)
      }
    }
    // connect setter outputs
    for(let pod of this.setterPods) {
      let node = LookUp.get(pod.id);
      for(let outputPod of pod.outputs) {
        let output = node.outputs.get(outputPod.name);
        // Note, link is not a qulified input pod. Resursive issue...
        // Just loop through all the inputs connected to current output, and connect them!
        for(let link of outputPod.links) {
          let pointer = LookUp.get(link.nodeID).inputs.get(link.name);
          pointer.connect(output, link.id)
        }
      }
    }

    // connect getter outputs
    for(let pod of this.getterPods) {
      let node = LookUp.get(pod.id);
      for(let outputPod of pod.outputs) {
        let output = node.outputs.get(outputPod.name);
        // Note, link is not a qulified input pod. Resursive issue...
        // Just loop through all the inputs connected to current output, and connect them!
        for(let link of outputPod.links) {
          let pointer = LookUp.get(link.nodeID).inputs.get(link.name);
          pointer.connect(output, link.id)
        }
      }
    }
    
    // create block
    for(let pod of this.getterPods) {
      // make sure the node related block needs belong the variable owner brain
      // this is for future proof, if we allow variable access across different brains.
      // otherwise, multiple blocks will be added to current openning brain graph.
      if(LookUp.get(pod.ownerID).brain.id == this.brainID) {
        BlockFactory.create(LookUp.get(pod.id));
      }
    }
    for(let pod of this.setterPods) {
      if(LookUp.get(pod.ownerID).brain.id == this.brainID) {
        BlockFactory.create(LookUp.get(pod.id));
      }
    }
    
    BrainGraph.refresh();

    // as variable list has order, easiest way is refresh the whole panel.
    ElementController.refresh();

    GraphSelection.select(ElementController.elements.get(this.variableID));
  }

  redo() {
    this.delete();
    BrainGraph.refresh();
  }
}