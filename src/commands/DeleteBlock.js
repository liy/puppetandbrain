import Command from './Command';
import BlockSelection from '../graph/BlockSelection';

export default class DeleteBlock extends Command
{
  constructor(blockID) {
    super();
    this.blockID = blockID;
  }
  
  process() {
    // get detailed pod information of the node.
    // which includes all the input and output pointer information nested in the pod
    this.pod = this.block.node.pod(true);
    // TODO: may be instead of call functions, include command here??!?
    BrainGraph.deleteBlock(this.block);
    return this;
  }

  get block() {
    return BrainGraph.getBlock(this.blockID);
  }

  undo() {
    let node = NodeFactory.create(this.pod.className, this.pod.id);
    node.init(this.pod);

    // connect executions
    if(this.pod.execution) {
      for(let exec of this.pod.execution) {
        if(exec.nodeID) node.connectNext(LookUp.get(exec.nodeID), exec.name)
      }
    }
    if(this.pod.enter) {
      for(let callerPod of this.pod.enter.callers) {
        if(callerPod.nodeID) node.connectParent(LookUp.get(callerPod.nodeID), callerPod.executionName);
      }
    }

    // connect inputs directly using pointer pod
    for(let pointerPod of this.pod.inputs) {
      let node = LookUp.get(pointerPod.nodeID);
      let pointer = node.inputs.get(pointerPod.name);
      pointer.set(pointerPod)
    }

    // loop through all the outputs and connect all the inputs(pointer) connected to this
    // output, manually WITHOUT using pointer pod.
    for(let outputPod of this.pod.outputs) {
      let output = node.outputs.get(outputPod.name);
      // note connection not a qulified pointer pod. Resursive issue...
      // Just loop through all the inputs connected to current output, and connect them!
      for(let connection of outputPod.connections) {
        let pointer = LookUp.get(connection.nodeID).inputs.get(connection.name);
        pointer.connect(output, connection.id)
      }
    }

    BlockFactory.create(node);
    BrainGraph.refresh();

    BlockSelection.select(this.block);
  }

  redo() {
    this.process();
    BrainGraph.refresh();
  }
}