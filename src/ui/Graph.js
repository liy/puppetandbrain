import Block from "./Block";

export default class Graph
{
  constructor() {
    this.container = document.getElementById('block-container');
    this.svg = document.getElementById('svg');
  }

  createBlock(model) {
    let block = new Block(model);
    this.container.appendChild(block.dom)
    return block;
  }
}