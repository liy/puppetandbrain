import Command from './Command';

export default class DeleteBlock extends Command
{
  constructor(block) {
    super();
    this.blockID = block.id;
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

    // connect inputs
    for(let inputPod of this.pod.inputs) {
      // if it is an output pointer
      if(inputPod.output) {
        let node = LookUp.get(inputPod.inputNode);
        let output = LookUp.get(inputPod.output.node).outputs.get(inputPod.output.name);
        node.inputs.get(inputPod.inputName).connect(output, inputPod.id);
      }
    }
    // connect outputs
    for(let outputPod of this.pod.outputs) {
      let output = node.outputs.get(outputPod.name);
      for(let pointerPod of outputPod.connections) {
        let input = LookUp.get(pointerPod.inputNode).inputs.get(pointerPod.inputName);
        input.connect(output, pointerPod.id)
      }
    }

    BlockFactory.create(node);
    BrainGraph.refresh();
  }

  redo() {
    this.process();
    BrainGraph.refresh();
  }
}