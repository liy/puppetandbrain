require('./ContentSection.scss')
import DummyBlock from "./DummyBlock";

export default class ContentSection
{
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'content-section';

    this.grid = document.createElement('div');
    this.grid.className = 'grid-section';
    this.element.appendChild(this.grid);

    this.blocks = [];

    for(let i=0; i<31; ++i) {
      let block = new DummyBlock({
        nodeName: 'test'
      });
      this.addBlock(block);
    }
  }

  addBlock(block) {
    this.grid.appendChild(block.gridBox);
    this.blocks.push(block);
  }
}