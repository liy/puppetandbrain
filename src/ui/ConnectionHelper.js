class ConnectionHelper
{
  constructor() {
    this.dataUses = [];
  }

  start(graph) {
    this.graph = graph;
    this.drawExecutionConnections();
    this.drawOutputConnections();
  }

  drawExecutionConnections() {
    let actors = LookUp.getActors();
    for(let actor of actors) {
      Object.keys(actor.functions).forEach(funcName => {
        let func = actor.functions[funcName];
        let currentBlock = this.graph.map[func.id];
        let nextBlock = this.graph.map[func.execution.get('default').id];

        this.traverseExecution(currentBlock, 'default', nextBlock);
      })
    }
  }

  traverseExecution(currentBlock, outPinName, nextBlock) {
    currentBlock.outPins[outPinName].connect(nextBlock.inPin);

    // traverse to next exectuion
    for(let name of nextBlock.model.execution.nameList) {
      let current = nextBlock;
      let task = current.model.execution.get(name);
      if(task) {
        let next = this.graph.map[task.id]
        this.traverseExecution(current, name, next)
      }
    }
  }

  drawOutputConnections() {
    let pointers = LookUp.getPointers();
    for(let pointer of pointers) {
      let outputBlock = this.graph.getBlock(pointer.outputNode.id);
      let inputBlock = this.graph.getBlock(pointer.inputNode.id);

      let inputPin = inputBlock.inputPins[pointer.inputName];
      let outputPin = outputBlock.outputPins[pointer.outputName];

      outputPin.connect(inputPin)
    }
  }
}

export default new ConnectionHelper();