import Command from './Command';
import GraphSelection from '../graph/GraphSelection';

export default class DeleteBlock extends Command
{
  constructor(blockID, oldX=null, oldY=null) {
    super();
    this.blockID = blockID;
    // user drag block to delete button, oldX and oldY will be supplied.
    // they will be used for reset block back to original place.
    this.oldX = oldX;
    this.oldY = oldY;
  }
  
  process() {
    // get detailed pod information of the node.
    // which includes all the input and output information nested in the pod
    this.pod = this.block.node.pod(true);
    // when user drag block to delete button,
    // we want to reset block back to original place.
    this.pod.x = this.oldX || this.pod.x;
    this.pod.y = this.oldY || this.pod.y;
    // TODO: may be instead of call functions, include command here??!?
    BrainGraph.deleteBlock(this.block);

    GraphSelection.deselect();

    return this;
  }

  get block() {
    return BrainGraph.getBlock(this.blockID);
  }

  undo() {
    let node = NodeFactory.shell(this.pod.className, this.pod.id, Hub.activity);
    node.init(this.pod);

    // connect executions
    if(this.pod.execution) {
      for(let exec of this.pod.execution) {
        if(exec.nodeID) node.connectNext(this.lookUp.get(exec.nodeID), exec.name)
      }
    }
    if(this.pod.enter) {
      for(let callerPod of this.pod.enter.callers) {
        if(callerPod.nodeID) node.connectParent(this.lookUp.get(callerPod.nodeID), callerPod.executionName);
      }
    }

    // connect inputs directly using pointer pod
    for(let pointerPod of this.pod.inputs) {
      let inputNode = this.lookUp.get(pointerPod.nodeID);
      let pointer = inputNode.inputs.get(pointerPod.name);
      pointer.set(pointerPod)
    }

    // loop through all the outputs and connect all the inputs connected to this
    // output, manually WITHOUT using input pod.
    for(let outputPod of this.pod.outputs) {
      let output = node.outputs.get(outputPod.name);
      // Note, link is not a qulified input pod because of resursive issue...
      // Just loop through all the inputs connected to current output, and connect them!
      for(let link of outputPod.links) {
        let pointer = this.lookUp.get(link.nodeID).inputs.get(link.name);
        pointer.connect(output, link.id)
      }
    }

    BlockFactory.create(node);
    BrainGraph.refresh();

    GraphSelection.select(this.block);
  }

  redo() {
    GraphSelection.select(this.block);
    this.process();
    BrainGraph.refresh();
  }
}