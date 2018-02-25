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
    return this.lookUp.get(this.variableID);
  }
  
  process() {
    this.delete();

    return this;
  }

  delete() {
    this.getterPods = [];
    this.setterPods = [];

    // remove the variable
    let brain = this.lookUp.get(this.brainID);
    let {variable, index} = brain.variables.remove(this.variablePod.id);
    this.variableIndex = index;

    let getters = this.variable.getters.concat();
    let setters = this.variable.setters.concat();

    // Get all and delete the getters and setters related to this variable
    // Note that I put the actual deletion in separate loop.
    // Just because I need the actual original pod of the nodes. Delete block
    // would have changed the data(e.g., execution input output link )
    for(let getter of getters) {
      this.getterPods.push(getter.pod(true));
    }
    for(let setter of setters) {
      this.setterPods.push(setter.pod(true));
    }
    for(let getter of getters) {
      console.log(getter.id);
      BrainGraph.deleteBlock(BrainGraph.getBlock(getter.id))
    }
    for(let setter of setters) {
      BrainGraph.deleteBlock(BrainGraph.getBlock(setter.id))
    }

    // destroy the variable, remove it from the look up
    variable.destroy();

    GraphSelection.deselect();
  }

  undo() {
    // put back the variable first
    let variable = new Variable(this.variablePod.id, ActivityManager.current);
    variable.init(this.variablePod);
    this.lookUp.get(this.brainID).variables.insert(variable, this.variableIndex);

    // re-create the nodes and blocks first. Getting ready for execution 
    // and variable linking!
    for(let pod of this.getterPods) {
      let node = NodeFactory.create(pod.className, pod.id, ActivityManager.current);
      node.init(pod);
    }
    for(let pod of this.setterPods) {
      let node = NodeFactory.create(pod.className, pod.id, ActivityManager.current);
      node.init(pod);
    }

    // Check DeleteBlock command for a simpler version of recovering 
    // execution link and output input link...
    // Here is basically multiple undo of the DeleteBlock

    // connect setter's execution
    for(let pod of this.setterPods) {
      let node = this.lookUp.get(pod.id);
      for(let exec of pod.execution) {
        if(exec.id) node.connectNext(this.lookUp.get(exec.id), exec.name)
      }
      // setter always has enter field
      for(let callerPod of pod.enter.callers) {
        if(callerPod.nodeID) node.connectParent(this.lookUp.get(callerPod.nodeID), callerPod.executionName);
      }
    }
    
    // connect setter inputs directly using input
    for(let pod of this.setterPods) {
      for(let pointerPod of pod.inputs) {
        let inputNode = this.lookUp.get(pointerPod.nodeID);
        let pointer = inputNode.inputs.get(pointerPod.name);
        pointer.set(pointerPod)
      }
    }
    // connect setter outputs
    for(let pod of this.setterPods) {
      let node = this.lookUp.get(pod.id);
      for(let outputPod of pod.outputs) {
        let output = node.outputs.get(outputPod.name);
        // Note, link is not a qulified input pod. Resursive issue...
        // Just loop through all the inputs connected to current output, and connect them!
        for(let link of outputPod.links) {
          let pointer = this.lookUp.get(link.nodeID).inputs.get(link.name);
          pointer.connect(output, link.id)
        }
      }
    }

    // connect getter outputs
    for(let pod of this.getterPods) {
      let node = this.lookUp.get(pod.id);
      for(let outputPod of pod.outputs) {
        let output = node.outputs.get(outputPod.name);
        // Note, link is not a qulified input pod. Resursive issue...
        // Just loop through all the inputs connected to current output, and connect them!
        for(let link of outputPod.links) {
          let pointer = this.lookUp.get(link.nodeID).inputs.get(link.name);
          pointer.connect(output, link.id)
        }
      }
    }
    
    // create block
    for(let pod of this.getterPods) {
      // make sure the node related block needs belong the variable owner brain
      // this is for future proof, if we allow variable access across different brains.
      // otherwise, multiple blocks will be added to current openning brain graph.
      if(this.lookUp.get(pod.ownerID).brain.id == this.brainID) {
        BlockFactory.create(this.lookUp.get(pod.id));
      }
    }
    for(let pod of this.setterPods) {
      if(this.lookUp.get(pod.ownerID).brain.id == this.brainID) {
        BlockFactory.create(this.lookUp.get(pod.id));
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