import OutputGetter from "../getters/OutputGetter";

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
    // let entries = LookUp.getTasks().concat(LookUp.getArithmetics());
    // entries.forEach(entry => {
    //   let inputBlock = this.graph.getBlock(entry.id);
    //   for(let name of entry.inputs.list) {
    //     let inputPin = inputBlock.inputPins[name];
    //     let linker = entry.inputs.get(name);

    //     console.log(linker)
    //     // let outputBlock = this.graph.getBlock(linker.targetID);

    //     // if(linker instanceof OutputGetter) {
    //     //   let outputBlock = this.graph.getBlock(linker.target.id);
    //     //   let outputPin = outputBlock.outputPins[linker.name]
    //     //   outputPin.connect(inputPin)
    //     // }
    //     // else if(linker instanceof Operation){
    //     //   let outputBlock = this.graph.getBlock(linker.id);
    //     //   let outputPin = outputBlock.outputPins['value']
    //     //   outputPin.connect(inputPin)
    //     // }
    //     // else if(linker instanceof PropertyGetter) {
    //     //   let outputBlock = this.graph.getBlock(linker.id);
    //     //   let outputPin = outputBlock.outputPins[name]
    //     //   outputPin.connect(inputPin)
    //     // }
    //   }
    // });

    let getters = LookUp.getGetters();
    for(let getter of getters) {
      if(getter instanceof OutputGetter) {
        let outputBlock = this.graph.getBlock(getter.outputNode.id);
        let inputBlock = this.graph.getBlock(getter.inputNode.id);

        let inputPin = inputBlock.inputPins[getter.inputName];
        let outputPin = outputBlock.outputPins[getter.outputName];
        outputPin.connect(inputPin)
      }
    }
  }
}

export default new ConnectionHelper();