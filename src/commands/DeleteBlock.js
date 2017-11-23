import Command from './Command';

export default class DeleteBlock extends Command
{
  constructor(block) {
    super();
    this.block = block;

    this.push();
  }
  
  process() {
    // get detailed pod information of the node.
    // which includes all the input and output pointer information nested in the pod
    this.pod = this.block.node.pod(true);
    BrainGraph.deleteBlock(this.block);
  }

  undo() {
    console.log(this.pod)
    let node = NodeFactory.create(this.pod.className, this.pod.id);
    node.init(this.pod);
    // connect executions
    if(this.pod.execution) {
      for(let exec of this.pod.execution) {
        // if it has no next execution
        if(exec.id) node.connectNext(LookUp.get(exec.id), exec.executionName);
      }
    }
    if(this.pod.callers) {
      for(let caller of this.pod.callers) {
        node.connectParent(LookUp.get(caller.id), caller.executionName)
      }
    }
    // connect inputs variables
    for(let pointer of this.pod.inputs) {
      // Make connection if it is a output connector(id is not undefined)
      if(pointer.id) {
        BrainGraph.brain.connectVariable(LookUp.get(pointer.inputNode), pointer.inputName, LookUp.get(pointer.outputNode), pointer.outputName, pointer.id);    
      }
    }
    // connect variables
    for(let pointer of this.pod.outputs) {
      BrainGraph.brain.connectVariable(LookUp.get(pointer.inputNode), pointer.inputName, LookUp.get(pointer.outputNode), pointer.outputName, pointer.id);    
    }
    this.block = BlockFactory.create(node);
    BrainGraph.refresh();
  }

  redo() {
    this.process();
  }
}