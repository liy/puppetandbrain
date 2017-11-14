import ConnectionHelper from './ConnectionHelper'

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

  getBlock(taskID) {
    return this.map[taskID]
  }

  refresh() {
    ConnectionHelper.start(this);
  }

  getLine(pin, b) {

  }
}