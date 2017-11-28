import Command from './Command';

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
        if(exec.id) node.connectNext(LookUp.get(exec.id), exec.executionName)
      }
    }
    if(this.pod.callers) {
      for(let caller of this.pod.callers) {
        if(caller.id) node.connectParent(LookUp.get(caller.id), caller.executionName);
      }
    }

    // connect inputs directly using pointer pod
    for(let pointerPod of this.pod.inputs) {
      let inputNode = LookUp.get(pointerPod.inputNode);
      let pointer = inputNode.inputs.get(pointerPod.inputName);
      pointer.set(pointerPod)
    }

    // loop through all the outputs and connect all the inputs(pointer) connected to this
    // output, manually WITHOUT using pointer pod.
    for(let outputPod of this.pod.outputs) {
      let output = node.outputs.get(outputPod.name);
      // note connection not a qulified pointer pod. Resursive issue...
      // Just loop through all the inputs connected to current output, and connect them!
      for(let connection of outputPod.connections) {
        let pointer = LookUp.get(connection.inputNode).inputs.get(connection.inputName);
        pointer.connect(output, connection.id)
      }
    }

    BlockFactory.create(node);
    BrainGraph.refresh();
  }

  redo() {
    this.processAndSave();
    BrainGraph.refresh();
  }
}