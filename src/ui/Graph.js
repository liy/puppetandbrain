import Block from "./Block";

export default class Graph
{
  constructor() {
    this.container = document.getElementById('block-container');
    this.svg = document.getElementById('svg');
  }

  add(block) {
    this.container.appendChild(block.dom)
  }
}