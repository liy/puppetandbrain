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
    let map = Object.create(null);
    this.dataUses = [];

    let tasks = LookUp.getTasks();
    tasks.forEach(task => {
      // inputs
      for(let inputName of task.inputs.list) {
        let data = task.inputs.get(inputName);
        if(data && Number.isInteger(data.id)) {
          if(!map[data.id]) {
            map[data.id] = {
              inputs: [],
              output: null,
              id: data.id
            }
            this.dataUses.push(map[data.id])
          }
          map[data.id].inputs.push({
            taskID: task.id,
            name: inputName
          })
        }
      }
      // outputs
      for(let outputName of task.outputs.list) {
        let data = task.outputs.get(outputName);
        if(data) {
          if(!map[data.id]) {
            map[data.id] = {
              inputs: [],
              output: null,
              id: data.id
            }
            this.dataUses.push(map[data.id])
          }
          map[data.id].output = {
            taskID: task.id,
            name: outputName
          };
        }
      }
    })

    // console.log(this.dataUses)
    for(let use of this.dataUses) {
      if(use.inputs.length != 0 && use.output != null) {
        let outputBlock = this.graph.getBlock(use.output.taskID);
        let outputPin = outputBlock.outputPins[use.output.name]
        console.log(use.output.name)
        for(let inputInfo of use.inputs) {
          let inputBlock = this.graph.getBlock(inputInfo.taskID);

          let inputPin = inputBlock.inputPins[inputInfo.name]
          outputPin.connect(inputPin)
        }
      }
    }
  }
}

export default new ConnectionHelper();