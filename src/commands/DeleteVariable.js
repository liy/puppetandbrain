import Command from './Command';
import Variable from '../data/Variable';

export default class DeleteVariable extends Command
{
  constructor(brainID, variableID) {
    super();
    this.variableID = variableID;
    this.brainID = brainID;
  }

  get variable() {
    return LookUp.get(this.variableID);
  }
  
  process() {
    this.getterPods = [];
    this.setterPods = [];

    // remove the variable
    let brain = LookUp.get(this.brainID);
    this.variablePod = this.variable.pod();
    brain.variables.remove(this.variable.name);
    // Variable panel needs to be updated to have the result
    BrainGraph.variablePanel.refresh();

    // Get all and delete the getters and setters related to this variable
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

    return this;
  }

  undo() {
    // put back the variable first
    let variable = new Variable(this.variablePod.id);
    variable.init(this.variablePod);
    LookUp.get(this.brainID).variables.add(variable);
    // Variable panel needs to be updated to have the undo result
    BrainGraph.variablePanel.refresh();

    // re-create the nodes and blocks first
    for(let pod of this.getterPods) {
      let node = NodeFactory.create(pod.className, pod.id);
      node.init(pod);
    }
    for(let pod of this.setterPods) {
      let node = NodeFactory.create(pod.className, pod.id);
      node.init(pod);
    }

    // connect setter's execution
    for(let pod of this.setterPods) {
      let node = LookUp.get(pod.id);
      for(let exec of pod.execution) {
        if(exec.id) node.connectNext(LookUp.get(exec.id), exec.executionName)
      }
      for(let caller of pod.callers) {
        if(caller.id) node.connectParent(LookUp.get(caller.id), caller.executionName);
      }
    }

    // Check Delete block for detail...
    
    // connect setter inputs directly using pointer
    for(let pod of this.setterPods) {
      for(let pointerPod of pod.inputs) {
        let inputNode = LookUp.get(pointerPod.inputNode);
        let pointer = inputNode.inputs.get(pointerPod.inputName);
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
  }

  redo() {
    this.processAndSave();
    BrainGraph.refresh();
  }
}