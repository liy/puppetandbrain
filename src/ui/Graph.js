import Block from "./Block";

export default class Graph
{
  constructor() {
    this.container = document.getElementById('block-container');
    this.svg = document.getElementById('svg');

    this.blocks = [];
    this.map = Object.create(null);
  }

  add(block) {
    this.container.appendChild(block.dom)

    this.blocks.push(block);
    this.map[block.model.id] = block;
  }

  refresh() {
    // testing connect two div using svg
    // let svg = document.getElementById('svg');

    // let outlet1 = document.getElementById('outlet1')
    // let outlet2 = document.getElementById('outlet2')

    // let offset = svg.getBoundingClientRect();
    // let a = outlet1.getBoundingClientRect();
    // let b = outlet2.getBoundingClientRect();

    // let x1 = (a.left + a.right)  / 2 - offset.left;
    // let y1 = (a.top  + a.bottom) / 2 - offset.top;
    // let x2 = (b.left + b.right)  / 2 - offset.left;
    // let y2 = (b.top  + b.bottom) / 2 - offset.top;

    // let path = document.createElementNS('http://www.w3.org/2000/svg','line');
    // path.setAttribute('x1', x1)
    // path.setAttribute('y1', y1)
    // path.setAttribute('x2', x2)
    // path.setAttribute('y2', y2)
    // path.setAttribute('stroke', '#FF0000');
    // path.setAttribute('stroke-width', 3);
    // path.setAttribute('fill', 'transparent');
    // svg.appendChild(path);

    let actors = LookUp.getActors();
    for(let actor of actors) {
      Object.keys(actor.functions).forEach(funcName => {
        let func = actor.functions[funcName];
        let currentBlock = this.map[func.id];
        let nextBlock = this.map[func.execution.get('default').id];

        this.traverseExecution(currentBlock, 'default', nextBlock);
      })
    }
  }

  getLine(pin, b) {

  }

  traverseExecution(currentBlock, outPinName, nextBlock) {
    // draw line form current block to next block
    let a = currentBlock.outPins[outPinName].position;
    let b = nextBlock.inPin.position

    let path = document.createElementNS('http://www.w3.org/2000/svg','line');
    path.setAttribute('x1', a.x)
    path.setAttribute('y1', a.y)
    path.setAttribute('x2', b.x)
    path.setAttribute('y2', b.y)
    path.setAttribute('stroke', '#FF0000');
    path.setAttribute('stroke-width', 3);
    path.setAttribute('fill', 'transparent');
    this.svg.appendChild(path);

    // traverse to next exectuion
    for(let name of nextBlock.model.execution.nameList) {
      currentBlock = nextBlock;
      let task = currentBlock.model.execution.get(name);
      if(task) {
        nextBlock = this.map[task.id]
        
        console.log(currentBlock, name, nextBlock)
        this.traverseExecution(currentBlock, name, nextBlock)
      }
    }
  }
}